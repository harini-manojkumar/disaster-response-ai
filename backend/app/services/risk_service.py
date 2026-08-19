def calculate_risk(
    urgency,
    severity,
    confidence,
    predicted_risk
):

    risk_score = (
        urgency * 0.30
        + severity * 0.30
        + confidence * 0.10
        + predicted_risk * 0.30
    )

    risk_score = round(risk_score, 2)

    if risk_score >= 80:
        priority = "CRITICAL"

    elif risk_score >= 60:
        priority = "HIGH"

    elif risk_score >= 40:
        priority = "MEDIUM"

    else:
        priority = "LOW"

    return {
        "risk_score": risk_score,
        "priority": priority
    }