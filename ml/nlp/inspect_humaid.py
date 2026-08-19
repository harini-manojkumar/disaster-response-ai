from pathlib import Path

data_dir = Path("data/raw/humaid")

files = list(data_dir.rglob("*.tsv"))

print("=" * 60)
print("HumAID TSV FILES")
print("=" * 60)

print(f"\nTotal TSV files: {len(files)}")

for file in files:
    print(file)

print("\n" + "=" * 60)