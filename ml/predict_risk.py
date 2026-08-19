from pathlib import Path

import joblib
import pandas as pd


# --------------------------------------------------
# PATHS
# --------------------------------------------------

PROJECT_ROOT = Path(__file__).resolve().parents[1]

DATA_PATH = (
    PROJECT_ROOT
    / "data"
    / "raw"
    / "geospatial"
    / "synthetic_disaster_geospatial_FINAL.csv"
)

MODEL_PATH = PROJECT_ROOT / "models" / "risk_model.pkl"


# --------------------------------------------------
# REQUIRED ML FEATURES
# --------------------------------------------------

FEATURES = [
    "past_report_count_30min",
    "past_report_count_60min",
    "report_growth_30min",
    "past_avg_urgency_30min",
    "past_people_30min",
    "urgency_score",
    "people_affected",
]

# --------------------------------------------------
# LOAD DATA
# --------------------------------------------------

print("\nLoading disaster data...")

df = pd.read_csv(DATA_PATH)

print(f"Dataset loaded: {df.shape}")


# --------------------------------------------------
# CHECK COLUMNS
# --------------------------------------------------

missing = [column for column in FEATURES if column not in df.columns]

if missing:
    print("\nERROR: Missing ML features:")
    print(missing)
    raise SystemExit(1)


# --------------------------------------------------
# SELECT LATEST REPORT
# --------------------------------------------------

df["timestamp"] = pd.to_datetime(
    df["timestamp"],
    errors="coerce"
)

df = df.dropna(subset=["timestamp"])

latest_report = df.sort_values("timestamp").iloc[-1]


print("\nLATEST REPORT")
print("--------------------------------")
print(f"Report ID:      {latest_report['report_id']}")
print(f"Timestamp:      {latest_report['timestamp']}")
print(f"Location:       {latest_report['latitude']}, "
      f"{latest_report['longitude']}")
print(f"Disaster type:  {latest_report['disaster_type']}")
print(f"Report type:    {latest_report['report_type']}")
print(f"Urgency:        {latest_report['urgency_score']}")
print(f"People affected: {latest_report['people_affected']}")


# --------------------------------------------------
# CREATE MODEL INPUT
# --------------------------------------------------

features = pd.DataFrame(
    [
        latest_report[FEATURES].values
    ],
    columns=FEATURES
)


print("\nMODEL INPUT")
print("--------------------------------")
print(features.to_string(index=False))


# --------------------------------------------------
# LOAD RANDOM FOREST
# --------------------------------------------------

print("\nLoading Random Forest model...")

if not MODEL_PATH.exists():

    print("\nERROR: Model not found:")
    print(MODEL_PATH)

    raise SystemExit(1)


model = joblib.load(MODEL_PATH)

print("Model loaded successfully.")


# --------------------------------------------------
# PREDICT
# --------------------------------------------------

prediction = model.predict(features)[0]


print("\n================================")
print("       RISK PREDICTION")
print("================================")

print(f"Predicted risk: {prediction}")


# --------------------------------------------------
# PROBABILITIES
# --------------------------------------------------

if hasattr(model, "predict_proba"):

    probabilities = model.predict_proba(features)[0]

    classes = model.classes_

    print("\nRisk probabilities:")

    for class_name, probability in zip(
        classes,
        probabilities
    ):

        print(
            f"  {class_name:<10} "
            f"{probability * 100:.2f}%"
        )



print("\nPrediction completed successfully.")