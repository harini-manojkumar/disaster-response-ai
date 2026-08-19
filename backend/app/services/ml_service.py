def analyze_report(
    description: str,
    emergency_type: str,
    people_affected: int
):

    # Temporary values for development
    urgency = 70
    severity = 60
    confidence = 85

    if people_affected >= 5:
        urgency += 15
        severity += 15

    if emergency_type.upper() == "FLOOD":
        severity += 10

    urgency = min(urgency, 100)
    severity = min(severity, 100)

    return {
        "urgency": urgency,
        "severity": severity,
        "confidence": confidence
    }