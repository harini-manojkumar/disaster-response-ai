from pathlib import Path
import pandas as pd

data_dir = Path("data/raw/humaid/events_set1")

train_files = list(data_dir.rglob("*_train.tsv"))
dev_files = list(data_dir.rglob("*_dev.tsv"))
test_files = list(data_dir.rglob("*_test.tsv"))

print("=" * 60)
print("HUMAID TRAINING DATA CHECK")
print("=" * 60)

# --------------------------------------------------
# LOAD TRAINING DATA
# --------------------------------------------------

train_data = []

for file in train_files:
    df = pd.read_csv(file, sep="\t")
    train_data.append(df)

train = pd.concat(train_data, ignore_index=True)

# --------------------------------------------------
# LOAD DEV DATA
# --------------------------------------------------

dev_data = []

for file in dev_files:
    df = pd.read_csv(file, sep="\t")
    dev_data.append(df)

dev = pd.concat(dev_data, ignore_index=True)

# --------------------------------------------------
# LOAD TEST DATA
# --------------------------------------------------

test_data = []

for file in test_files:
    df = pd.read_csv(file, sep="\t")
    test_data.append(df)

test = pd.concat(test_data, ignore_index=True)

# --------------------------------------------------
# DATASET SIZE
# --------------------------------------------------

print("\nDATASET SIZE")
print("-" * 40)

print("Training:", len(train))
print("Development:", len(dev))
print("Testing:", len(test))

# --------------------------------------------------
# TRAINING CLASS DISTRIBUTION
# --------------------------------------------------

print("\nTRAINING CLASS DISTRIBUTION")
print("-" * 40)

print(train["class_label"].value_counts())

# --------------------------------------------------
# TRAINING CLASS PERCENTAGES
# --------------------------------------------------

print("\nTRAINING CLASS PERCENTAGES")
print("-" * 40)

percentages = train["class_label"].value_counts(normalize=True) * 100

print(percentages.round(2))

# --------------------------------------------------
# DUPLICATE CHECK
# --------------------------------------------------

print("\nDUPLICATE CHECK")
print("-" * 40)

duplicate_tweets = train["tweet_text"].duplicated().sum()

print("Duplicate tweets in training:", duplicate_tweets)

# --------------------------------------------------
# MISSING VALUES
# --------------------------------------------------

print("\nMISSING VALUES")
print("-" * 40)

print(train.isnull().sum())

# --------------------------------------------------
# UNIQUE TWEETS
# --------------------------------------------------

print("\nUNIQUE TWEETS")
print("-" * 40)

print("Total training tweets:", len(train))
print("Unique training tweets:", train["tweet_text"].nunique())

# --------------------------------------------------
# FINAL
# --------------------------------------------------

print("\n" + "=" * 60)
print("TRAINING DATA CHECK COMPLETED")
print("=" * 60)