from pathlib import Path

import pandas as pd
import geopandas as gpd
from shapely.geometry import Point


# ============================================================
# PROJECT PATHS
# ============================================================

BASE_DIR = Path(__file__).resolve().parent.parent

INPUT_PATH = (
    BASE_DIR
    / "data"
    / "processed"
    / "hotspot_results.csv"
)

OUTPUT_DIR = (
    BASE_DIR
    / "gis"
    / "outputs"
)

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


# ============================================================
# LOAD HOTSPOT RESULTS
# ============================================================

print("Loading hotspot results...")

df = pd.read_csv(INPUT_PATH)

print(f"Hotspots loaded: {len(df)}")


# ============================================================
# CREATE POINT GEOMETRY
# ============================================================

geometry = [
    Point(longitude, latitude)
    for longitude, latitude in zip(
        df["longitude"],
        df["latitude"]
    )
]

gdf = gpd.GeoDataFrame(
    df,
    geometry=geometry,
    crs="EPSG:4326"
)


# ============================================================
# SAVE HOTSPOT POINTS
# ============================================================

POINT_OUTPUT = OUTPUT_DIR / "hotspots.geojson"

gdf.to_file(
    POINT_OUTPUT,
    driver="GeoJSON"
)

print("\nHotspot points saved:")
print(POINT_OUTPUT)


# ============================================================
# CREATE RISK ZONES
# ============================================================

# EPSG:3857 uses meters, which allows us to create
# buffers using distances such as 1000 meters.

gdf_metric = gdf.to_crs(epsg=3857)


# ============================================================
# SET ZONE RADIUS
# ============================================================

def get_radius(priority):

    if priority == "CRITICAL":
        return 1000

    elif priority == "HIGH":
        return 750

    elif priority == "MEDIUM":
        return 500

    else:
        return 350


gdf_metric["radius_meters"] = (
    gdf_metric["priority_level"]
    .apply(get_radius)
)


# ============================================================
# CREATE CIRCULAR RISK ZONES
# ============================================================

gdf_metric["geometry"] = (
    gdf_metric.apply(
        lambda row: row.geometry.buffer(
            row["radius_meters"]
        ),
        axis=1
    )
)


# ============================================================
# CONVERT BACK TO LAT/LONG
# ============================================================

zones = gdf_metric.to_crs(epsg=4326)


# ============================================================
# SAVE RISK ZONES
# ============================================================

ZONE_OUTPUT = OUTPUT_DIR / "risk_zones.geojson"

zones.to_file(
    ZONE_OUTPUT,
    driver="GeoJSON"
)

print("\nRisk zones saved:")
print(ZONE_OUTPUT)


# ============================================================
# FINAL INFORMATION
# ============================================================

print("\n" + "=" * 50)
print("GIS GEOJSON GENERATION COMPLETED")
print("=" * 50)

print(f"\nHotspot points:")
print(POINT_OUTPUT)

print(f"\nRisk zones:")
print(ZONE_OUTPUT)

print("\nPriority distribution:")

print(
    zones["priority_level"]
    .value_counts()
)