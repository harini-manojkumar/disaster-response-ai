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

class RiskPredictionRequest(BaseModel):
    past_report_count_30min: float
    past_report_count_60min: float
    report_growth_30min: float
    past_avg_urgency_30min: float
    past_people_30min: float
    urgency_score: float
    people_affected: float