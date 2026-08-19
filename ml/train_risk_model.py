from pathlib import Path

import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)


# --------------------------------------------------
# 1. LOAD DATASET
# --------------------------------------------------

PROJECT_ROOT = Path(__file__).resolve().parents[1]

DATA_PATH = (
    PROJECT_ROOT
    / "data"
    / "raw"
    / "geospatial"
    / "synthetic_disaster_geospatial_FINAL.csv"
)

print("Loading dataset...")

df = pd.read_csv(DATA_PATH)

print("Dataset loaded successfully.")
print("Shape:", df.shape)


# --------------------------------------------------
# 2. REMOVE ROWS WITHOUT TARGET
# --------------------------------------------------

TARGET = "risk_level_next_30min"

df = df.dropna(subset=[TARGET]).copy()

print("\nAfter removing missing target rows:")
print("Shape:", df.shape)


# --------------------------------------------------
# 3. SELECT FEATURES
# --------------------------------------------------

FEATURES = [
    "past_report_count_30min",
    "past_report_count_60min",
    "report_growth_30min",
    "past_avg_urgency_30min",
    "past_people_30min",
    "urgency_score",
    "people_affected"
]

X = df[FEATURES]

y = df[TARGET]


# --------------------------------------------------
# 4. CHECK TARGET DISTRIBUTION
# --------------------------------------------------

print("\n--- TARGET DISTRIBUTION ---")

print(y.value_counts())

print("\n--- TARGET PERCENTAGES ---")

print(y.value_counts(normalize=True) * 100)


# --------------------------------------------------
# 5. TRAIN / TEST SPLIT
# --------------------------------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

print("\n--- DATA SPLIT ---")

print("Training samples:", len(X_train))

print("Testing samples:", len(X_test))


# --------------------------------------------------
# 6. CREATE MODEL
# --------------------------------------------------

model = RandomForestClassifier(
    n_estimators=200,
    random_state=42,
    class_weight="balanced"
)


# --------------------------------------------------
# 7. TRAIN MODEL
# --------------------------------------------------

print("\nTraining Random Forest model...")

model.fit(X_train, y_train)

print("Model training completed.")


# --------------------------------------------------
# 8. PREDICT
# --------------------------------------------------

y_pred = model.predict(X_test)


# --------------------------------------------------
# 9. EVALUATE
# --------------------------------------------------

accuracy = accuracy_score(y_test, y_pred)

print("\n--- MODEL PERFORMANCE ---")

print("Accuracy:", round(accuracy * 100, 2), "%")

print("\nClassification Report:")

print(
    classification_report(
        y_test,
        y_pred
    )
)


# --------------------------------------------------
# 10. CONFUSION MATRIX
# --------------------------------------------------

print("\n--- CONFUSION MATRIX ---")

print(
    confusion_matrix(
        y_test,
        y_pred
    )
)


# --------------------------------------------------
# 11. FEATURE IMPORTANCE
# --------------------------------------------------

print("\n--- FEATURE IMPORTANCE ---")

importance = pd.DataFrame({
    "feature": FEATURES,
    "importance": model.feature_importances_
})

importance = importance.sort_values(
    "importance",
    ascending=False
)

print(importance.to_string(index=False))
# --------------------------------------------------
# 12. SAVE TRAINED MODEL
# --------------------------------------------------

import joblib

MODEL_DIR = PROJECT_ROOT / "models"

MODEL_DIR.mkdir(exist_ok=True)

MODEL_PATH = MODEL_DIR / "risk_model.pkl"

joblib.dump(model, MODEL_PATH)

print("\n--- MODEL SAVED ---")
print("Model saved to:")
print(MODEL_PATH)