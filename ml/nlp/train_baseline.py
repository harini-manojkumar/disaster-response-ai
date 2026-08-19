from pathlib import Path
import pandas as pd

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, accuracy_score, f1_score


# ============================================================
# PATHS
# ============================================================

data_dir = Path("data/raw/humaid/events_set1")


# ============================================================
# FUNCTION TO LOAD DATA
# ============================================================

def load_split(split_name):
    files = list(data_dir.rglob(f"*_{split_name}.tsv"))

    data = []

    for file in files:
        df = pd.read_csv(file, sep="\t")
        data.append(df)

    return pd.concat(data, ignore_index=True)


# ============================================================
# LOAD DATA
# ============================================================

print("=" * 60)
print("LOADING HUMAID DATASET")
print("=" * 60)

train = load_split("train")
dev = load_split("dev")
test = load_split("test")

print("\nTraining:", len(train))
print("Development:", len(dev))
print("Testing:", len(test))


# ============================================================
# TEXT AND LABELS
# ============================================================

X_train = train["tweet_text"].fillna("")
y_train = train["class_label"]

X_dev = dev["tweet_text"].fillna("")
y_dev = dev["class_label"]

X_test = test["tweet_text"].fillna("")
y_test = test["class_label"]


# ============================================================
# TF-IDF
# ============================================================

print("\n" + "=" * 60)
print("CREATING TF-IDF FEATURES")
print("=" * 60)

vectorizer = TfidfVectorizer(
    max_features=30000,
    ngram_range=(1, 2),
    min_df=2,
    sublinear_tf=True
)

X_train_tfidf = vectorizer.fit_transform(X_train)

X_dev_tfidf = vectorizer.transform(X_dev)

X_test_tfidf = vectorizer.transform(X_test)

print("Training TF-IDF shape:", X_train_tfidf.shape)
print("Development TF-IDF shape:", X_dev_tfidf.shape)
print("Testing TF-IDF shape:", X_test_tfidf.shape)


# ============================================================
# TRAIN LOGISTIC REGRESSION
# ============================================================

print("\n" + "=" * 60)
print("TRAINING LOGISTIC REGRESSION")
print("=" * 60)

model = LogisticRegression(
    max_iter=1000,
    class_weight="balanced"
)

model.fit(X_train_tfidf, y_train)

print("Training completed!")


# ============================================================
# DEVELOPMENT EVALUATION
# ============================================================

print("\n" + "=" * 60)
print("DEVELOPMENT RESULTS")
print("=" * 60)

dev_predictions = model.predict(X_dev_tfidf)

dev_accuracy = accuracy_score(y_dev, dev_predictions)

dev_f1 = f1_score(
    y_dev,
    dev_predictions,
    average="macro"
)

print("Development Accuracy:", round(dev_accuracy, 4))
print("Development Macro F1:", round(dev_f1, 4))

print("\nClassification Report:")
print(
    classification_report(
        y_dev,
        dev_predictions,
        zero_division=0
    )
)


# ============================================================
# TEST EVALUATION
# ============================================================

print("\n" + "=" * 60)
print("TEST RESULTS")
print("=" * 60)

test_predictions = model.predict(X_test_tfidf)

test_accuracy = accuracy_score(y_test, test_predictions)

test_f1 = f1_score(
    y_test,
    test_predictions,
    average="macro"
)

print("Test Accuracy:", round(test_accuracy, 4))
print("Test Macro F1:", round(test_f1, 4))

print("\nClassification Report:")
print(
    classification_report(
        y_test,
        test_predictions,
        zero_division=0
    )
)


# ============================================================
# FINISHED
# ============================================================

print("\n" + "=" * 60)
print("BASELINE MODEL COMPLETED")
print("=" * 60)