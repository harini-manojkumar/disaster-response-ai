from pathlib import Path
import tarfile

data_dir = Path("data/raw/humaid")

archives = list(data_dir.glob("*.tar.gz"))

if not archives:
    print("ERROR: No .tar.gz file found.")
    raise SystemExit

archive = archives[0]

print("Extracting:")
print(archive)

with tarfile.open(archive, "r:gz") as tar:
    tar.extractall(path=data_dir)

print("\nExtraction completed!")