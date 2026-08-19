from pathlib import Path

import joblib
import pandas as pd


PROJECT_ROOT = Path(__file__).resolve().parents[3]
MODEL_PATH = PROJECT_ROOT / "models" / "risk_model.pkl"


model = joblib.load(MODEL_PATH)


def predict_risk(
    past_report_count_30min: float,
    past_report_count_60min: float,
    report_growth_30min: float,
    past_avg_urgency_30min: float,
    past_people_30min: float,
    urgency_score: float,
    people_affected: float,
):
    features = pd.DataFrame({
        "past_report_count_30min": [past_report_count_30min],
        "past_report_count_60min": [past_report_count_60min],
        "report_growth_30min": [report_growth_30min],
        "past_avg_urgency_30min": [past_avg_urgency_30min],
        "past_people_30min": [past_people_30min],
        "urgency_score": [urgency_score],
        "people_affected": [people_affected],
    })

    prediction = model.predict(features)[0]

    probabilities = model.predict_proba(features)[0]

    probability_dict = {
        str(class_name): round(float(probability) * 100, 2)
        for class_name, probability in zip(model.classes_, probabilities)
    }

    return {
        "predicted_risk": str(prediction),
        "probabilities": probability_dict
    }