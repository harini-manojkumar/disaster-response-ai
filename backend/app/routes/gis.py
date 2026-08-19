from fastapi import APIRouter
from backend.app.services.gis_service import get_hotspots, get_risk_zones


router = APIRouter(
    prefix="/api",
    tags=["GIS"]
)


@router.get("/hotspots")
def hotspots():
    return get_hotspots()


@router.get("/risk-zones")
def risk_zones():
    return get_risk_zones()