from pathlib import Path
import pandas as pd

data_dir = Path("data/raw/humaid")

files = list(data_dir.rglob("*.tsv"))

if not files:
    print("ERROR: No TSV files found.")
    raise SystemExit

file = files[0]

print("=" * 60)
print("INSPECTING HUM AID FILE")
print("=" * 60)

print("\nFile:")
print(file)

df = pd.read_csv(file, sep="\t")

print("\nColumns:")
for column in df.columns:
    print(" -", column)

print("\nShape:")
print(df.shape)

print("\nFirst 5 rows:")
print(df.head().to_string())

print("\nData types:")
print(df.dtypes)

print("\nMissing values:")
print(df.isnull().sum())

print("\n" + "=" * 60)