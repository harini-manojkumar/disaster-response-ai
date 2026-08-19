from pathlib import Path
import json


PROJECT_ROOT = Path(__file__).resolve().parents[3]

HOTSPOTS_PATH = PROJECT_ROOT / "gis" / "outputs" / "hotspots.geojson"
RISK_ZONES_PATH = PROJECT_ROOT / "gis" / "outputs" / "risk_zones.geojson"


def get_hotspots():
    """Load generated hotspot GeoJSON."""

    with open(HOTSPOTS_PATH, "r", encoding="utf-8") as file:
        return json.load(file)


def get_risk_zones():
    """Load generated risk-zone GeoJSON."""

    with open(RISK_ZONES_PATH, "r", encoding="utf-8") as file:
        return json.load(file)
    