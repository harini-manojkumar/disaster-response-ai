from pydantic import BaseModel

from typing import Optional


class ReportCreate(BaseModel):

    description: str

    emergency_type: str

    latitude: Optional[float] = None

    longitude: Optional[float] = None

    people_affected: int = 1


class ReportResponse(BaseModel):

    id: int

    description: str

    emergency_type: str

    latitude: Optional[float]

    longitude: Optional[float]

    people_affected: int

    status: str

    urgency: float

    severity: float

    confidence: float

    risk_score: float

    priority: str

    hotspot_id: Optional[str]

    predicted_risk: float

    class Config:

        from_attributes = True