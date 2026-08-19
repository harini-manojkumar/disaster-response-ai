from fastapi import APIRouter
from pydantic import BaseModel

from .incidents import incidents


router = APIRouter(
    prefix="/api/reports",
    tags=["Reports"]
)


class ReportCreate(BaseModel):

    description: str
    emergency_type: str
    latitude: float
    longitude: float
    people_affected: int


def calculate_risk(
    emergency_type,
    people
):

    risk = 40


    if emergency_type == "Flood":
        risk += 20

    elif emergency_type == "Fire":
        risk += 25

    elif emergency_type == "Medical Emergency":
        risk += 15

    elif emergency_type == "Landslide":
        risk += 25

    elif emergency_type == "Building Collapse":
        risk += 30

    elif emergency_type == "Road Accident":
        risk += 15


    if people >= 10:
        risk += 20

    elif people >= 5:
        risk += 10

    elif people >= 2:
        risk += 5


    return min(
        risk,
        100
    )


def calculate_priority(risk):

    if risk >= 85:
        return "CRITICAL"

    if risk >= 65:
        return "HIGH"

    if risk >= 40:
        return "MEDIUM"

    return "LOW"


@router.post("")
def create_report(
    report: ReportCreate
):

    risk = calculate_risk(
        report.emergency_type,
        report.people_affected
    )

    priority = calculate_priority(
        risk
    )


    incident = {

        "id": f"INC-{len(incidents) + 1:03d}",

        "type": report.emergency_type,

        "description": report.description,

        "latitude": report.latitude,

        "longitude": report.longitude,

        "people": report.people_affected,

        "risk": risk,

        "priority": priority,

        "status": "PENDING",

        "allocated": {
            "ambulance": 0,
            "rescue": 0,
            "fire": 0
        }
    }


    incidents.append(
        incident
    )


    return {

        "message": "Emergency report received",

        "incident": incident
    }