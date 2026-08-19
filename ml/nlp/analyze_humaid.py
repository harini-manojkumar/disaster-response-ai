from pathlib import Path
import pandas as pd

data_dir = Path("data/raw/humaid/events_set1")

files = list(data_dir.rglob("*.tsv"))

all_data = []

for file in files:
    df = pd.read_csv(file, sep="\t")

    # Identify train/dev/test
    filename = file.stem

    if filename.endswith("_train"):
        split = "train"
    elif filename.endswith("_dev"):
        split = "dev"
    elif filename.endswith("_test"):
        split = "test"
    else:
        split = "unknown"

    # Event name = parent folder
    event = file.parent.name

    df["event"] = event
    df["split"] = split

    all_data.append(df)

data = pd.concat(all_data, ignore_index=True)

print("=" * 60)
print("HUMAID DATASET ANALYSIS")
print("=" * 60)

print("\nTotal TSV files:", len(files))
print("Total tweets:", len(data))

print("\n" + "=" * 60)
print("CLASS DISTRIBUTION")
print("=" * 60)

class_counts = data["class_label"].value_counts()

print(class_counts)

print("\nNumber of classes:", data["class_label"].nunique())

print("\n" + "=" * 60)
print("CLASS PERCENTAGES")
print("=" * 60)

print(
    (data["class_label"].value_counts(normalize=True) * 100)
    .round(2)
)

print("\n" + "=" * 60)
print("SPLIT DISTRIBUTION")
print("=" * 60)

print(data["split"].value_counts())

print("\n" + "=" * 60)
print("EVENT DISTRIBUTION")
print("=" * 60)

print(data["event"].value_counts())

print("\n" + "=" * 60)
print("MISSING VALUES")
print("=" * 60)

print(data.isnull().sum())

print("\n" + "=" * 60)
print("DATASET READY")
print("=" * 60)