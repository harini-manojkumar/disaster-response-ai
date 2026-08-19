from fastapi import APIRouter

from backend.app.schemas import RiskPredictionRequest
from backend.app.services.ml_service import predict_risk


router = APIRouter(
    prefix="/api",
    tags=["ML Risk Prediction"]
)


@router.post("/predict-risk")
def predict_risk_endpoint(request: RiskPredictionRequest):
    result = predict_risk(
        past_report_count_30min=request.past_report_count_30min,
        past_report_count_60min=request.past_report_count_60min,
        report_growth_30min=request.report_growth_30min,
        past_avg_urgency_30min=request.past_avg_urgency_30min,
        past_people_30min=request.past_people_30min,
        urgency_score=request.urgency_score,
        people_affected=request.people_affected,
    )

    return result