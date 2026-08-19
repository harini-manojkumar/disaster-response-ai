from pathlib import Path
import pandas as pd

data_dir = Path("data/raw/humaid")

files = list(data_dir.rglob("*.tsv"))

print("Number of TSV files:", len(files))
print()

for file in files:
    try:
        df = pd.read_csv(file, sep="\t")

        print(f"{file}")
        print("Rows:", len(df))
        print("Columns:", list(df.columns))
        print("-" * 60)

    except Exception as e:
        print("ERROR:", file, e)