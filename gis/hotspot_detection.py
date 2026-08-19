from pathlib import Path
import pandas as pd
import numpy as np
from sklearn.cluster import DBSCAN


# Find the main project folder
BASE_DIR = Path(__file__).resolve().parent.parent

# Path to your dataset
DATA_PATH = (
    BASE_DIR
    / "data"
    / "raw"
    / "geospatial"
    / "synthetic_disaster_geospatial_FINAL.csv"
)

print("Loading disaster geospatial dataset...\n")

# Load the CSV
df = pd.read_csv(DATA_PATH)

# Basic information
print("DATASET LOADED SUCCESSFULLY")
print("-" * 40)

print("\nDataset shape:")
print(f"Rows: {df.shape[0]}")
print(f"Columns: {df.shape[1]}")

print("\nColumn names:")
print(df.columns.tolist())

print("\nFirst 5 rows:")
print(df.head())

print("\nMissing values:")
print(df.isnull().sum())

# Validate latitude and longitude
print("\nLatitude range:")
print(df["latitude"].min(), "to", df["latitude"].max())

print("\nLongitude range:")
print(df["longitude"].min(), "to", df["longitude"].max())

# Convert timestamp to datetime
df["timestamp"] = pd.to_datetime(df["timestamp"])

print("\nTime range:")
print("Start:", df["timestamp"].min())
print("End:", df["timestamp"].max())

# Check invalid coordinates
invalid = df[
    (df["latitude"] < -90)
    | (df["latitude"] > 90)
    | (df["longitude"] < -180)
    | (df["longitude"] > 180)
]

print("\nInvalid coordinate rows:", len(invalid))

print("\nGIS DATA VALIDATION COMPLETED SUCCESSFULLY")
# -------------------------------------------------
# 9. SIMULATE A REAL-TIME WINDOW
# -------------------------------------------------

# Choose a simulation time
current_time = pd.Timestamp("2026-08-19 12:00:00")

# Look at reports from the previous 30 minutes
window_start = current_time - pd.Timedelta(minutes=30)

recent_reports = df[
    (df["timestamp"] > window_start)
    & (df["timestamp"] <= current_time)
].copy()

print("\n--- REAL-TIME SIMULATION ---")
print("Current time:", current_time)
print("Window start:", window_start)
print("Window end:", current_time)
print("Reports received in last 30 minutes:", len(recent_reports))

print("\nSample reports in current window:")
print(
    recent_reports[
        [
            "report_id",
            "timestamp",
            "latitude",
            "longitude",
            "urgency_score",
            "people_affected",
            "severity",
        ]
    ].head()
)
# -------------------------------------------------
# 10. DBSCAN HOTSPOT DETECTION
# -------------------------------------------------

# Earth's radius in kilometers
EARTH_RADIUS_KM = 6371.0088

# Maximum distance between reports in a hotspot
# 0.5 km = 500 meters
EPS_KM = 0.5

# Minimum number of reports required to form a hotspot
MIN_SAMPLES = 5

# Extract latitude and longitude
coordinates = recent_reports[
    ["latitude", "longitude"]
].to_numpy()

# Convert latitude/longitude from degrees to radians
coordinates_radians = np.radians(coordinates)

# Convert distance from kilometers to radians
eps_radians = EPS_KM / EARTH_RADIUS_KM

# Create DBSCAN model
dbscan = DBSCAN(
    eps=eps_radians,
    min_samples=MIN_SAMPLES,
    metric="haversine",
    algorithm="ball_tree"
)

# Detect clusters
recent_reports["cluster"] = dbscan.fit_predict(
    coordinates_radians
)

print("\n--- DBSCAN HOTSPOT DETECTION ---")

print("Search radius:", EPS_KM * 1000, "meters")
print("Minimum reports required:", MIN_SAMPLES)

print("\nCluster counts:")
print(
    recent_reports["cluster"]
    .value_counts()
    .sort_index()
)

# Get actual hotspot labels
hotspot_labels = recent_reports[
    recent_reports["cluster"] != -1
]["cluster"].unique()

print("\nNumber of hotspots detected:", len(hotspot_labels))

# Count isolated/noise reports
noise_count = (
    recent_reports["cluster"] == -1
).sum()

print("Noise / isolated reports:", noise_count)
# -------------------------------------------------
# 11. HOTSPOT STATISTICS
# -------------------------------------------------

print("\n--- HOTSPOT STATISTICS ---")

# Store statistics for every detected hotspot
hotspot_stats = []

for cluster_id in hotspot_labels:

    # Get reports belonging to this hotspot
    cluster_data = recent_reports[
        recent_reports["cluster"] == cluster_id
    ].copy()

    # Calculate hotspot center
    center_latitude = cluster_data["latitude"].mean()
    center_longitude = cluster_data["longitude"].mean()

    # Basic statistics
    report_count = len(cluster_data)

    average_urgency = cluster_data[
        "urgency_score"
    ].mean()

    total_people = cluster_data[
        "people_affected"
    ].sum()

    # Count severity levels
    severe_count = (
        cluster_data["severity"] == "Severe"
    ).sum()

    high_count = (
        cluster_data["severity"] == "High"
    ).sum()

    medium_count = (
        cluster_data["severity"] == "Medium"
    ).sum()

    low_count = (
        cluster_data["severity"] == "Low"
    ).sum()

    # Store the hotspot information
    hotspot_stats.append({
        "cluster": cluster_id,
        "latitude": center_latitude,
        "longitude": center_longitude,
        "report_count": report_count,
        "average_urgency": average_urgency,
        "total_people_affected": total_people,
        "severe_reports": severe_count,
        "high_reports": high_count,
        "medium_reports": medium_count,
        "low_reports": low_count
    })


# Convert results into a DataFrame
hotspot_df = pd.DataFrame(hotspot_stats)

# Sort hotspots by number of reports
hotspot_df = hotspot_df.sort_values(
    by="report_count",
    ascending=False
)

print("\nDetected hotspot statistics:")
print(hotspot_df.to_string(index=False))
# -------------------------------------------------
# 12. HOTSPOT PRIORITY SCORING
# -------------------------------------------------

print("\n--- HOTSPOT PRIORITY SCORING ---")

# Normalize a value between 0 and 100
def normalize(series):

    minimum = series.min()
    maximum = series.max()

    if maximum == minimum:
        return pd.Series(
            [100] * len(series),
            index=series.index
        )

    return (
        (series - minimum)
        / (maximum - minimum)
    ) * 100


# Normalize important factors
hotspot_df["urgency_score_norm"] = normalize(
    hotspot_df["average_urgency"]
)

hotspot_df["people_score_norm"] = normalize(
    hotspot_df["total_people_affected"]
)

hotspot_df["report_score_norm"] = normalize(
    hotspot_df["report_count"]
)

# Calculate percentage of severe reports
hotspot_df["severe_ratio"] = (
    hotspot_df["severe_reports"]
    / hotspot_df["report_count"]
) * 100

hotspot_df["severe_score_norm"] = normalize(
    hotspot_df["severe_ratio"]
)


# -------------------------------------------------
# Weighted priority score
# -------------------------------------------------

hotspot_df["priority_score"] = (

    hotspot_df["urgency_score_norm"] * 0.30

    + hotspot_df["people_score_norm"] * 0.30

    + hotspot_df["report_score_norm"] * 0.20

    + hotspot_df["severe_score_norm"] * 0.20

)


# -------------------------------------------------
# Assign priority levels
# -------------------------------------------------

def assign_priority(score):

    if score >= 75:
        return "CRITICAL"

    elif score >= 50:
        return "HIGH"

    elif score >= 25:
        return "MEDIUM"

    else:
        return "LOW"


hotspot_df["priority_level"] = (
    hotspot_df["priority_score"]
    .apply(assign_priority)
)


# Sort highest priority first
hotspot_df = hotspot_df.sort_values(
    by="priority_score",
    ascending=False
)


print("\nHOTSPOT PRIORITY RANKING")
print("----------------------------------------")

print(
    hotspot_df[
        [
            "cluster",
            "latitude",
            "longitude",
            "report_count",
            "average_urgency",
            "total_people_affected",
            "severe_reports",
            "priority_score",
            "priority_level"
        ]
    ].to_string(index=False)
)
# -------------------------------------------------
# 13. SAVE HOTSPOT RESULTS
# -------------------------------------------------

OUTPUT_DIR = BASE_DIR / "data" / "processed"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

OUTPUT_PATH = OUTPUT_DIR / "hotspot_results.csv"

# Save only the useful GIS/hotspot columns
output_columns = [
    "cluster",
    "latitude",
    "longitude",
    "report_count",
    "average_urgency",
    "total_people_affected",
    "severe_reports",
    "high_reports",
    "medium_reports",
    "low_reports",
    "priority_score",
    "priority_level"
]

hotspot_df[output_columns].to_csv(
    OUTPUT_PATH,
    index=False
)

print("\n--- HOTSPOT RESULTS SAVED ---")
print(f"Saved to: {OUTPUT_PATH}")