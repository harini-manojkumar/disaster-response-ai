import os
import pandas as pd
import torch

from datasets import Dataset
from transformers import (
    AutoTokenizer,
    AutoModelForSequenceClassification,
    TrainingArguments,
    Trainer
)
from sklearn.metrics import accuracy_score, f1_score


# ============================================================
# CONFIGURATION
# ============================================================

MODEL_NAME = "distilbert-base-uncased"

DATA_DIR = "data/raw/humaid/events_set1"

OUTPUT_DIR = "models/distilbert_humaid"

MAX_LENGTH = 128


# ============================================================
# CLASS LABELS
# ============================================================

LABELS = [
    "caution_and_advice",
    "displaced_people_and_evacuations",
    "infrastructure_and_utility_damage",
    "injured_or_dead_people",
    "missing_or_found_people",
    "not_humanitarian",
    "other_relevant_information",
    "requests_or_urgent_needs",
    "rescue_volunteering_or_donation_effort",
    "sympathy_and_support"
]

label2id = {label: i for i, label in enumerate(LABELS)}
id2label = {i: label for i, label in enumerate(LABELS)}


# ============================================================
# LOAD HUMAID DATA
# ============================================================

print("=" * 60)
print("LOADING HUMAID DATASET")
print("=" * 60)


all_files = []

for root, dirs, files in os.walk(DATA_DIR):
    for file in files:
        if file.endswith(".tsv"):
            all_files.append(os.path.join(root, file))


train_files = [
    f for f in all_files
    if "_train.tsv" in os.path.basename(f)
]

dev_files = [
    f for f in all_files
    if "_dev.tsv" in os.path.basename(f)
]

test_files = [
    f for f in all_files
    if "_test.tsv" in os.path.basename(f)
]


def load_files(files):

    dataframes = []

    for file in files:

        df = pd.read_csv(
            file,
            sep="\t"
        )

        dataframes.append(
            df[["tweet_text", "class_label"]]
        )

    return pd.concat(
        dataframes,
        ignore_index=True
    )


train_df = load_files(train_files)
dev_df = load_files(dev_files)
test_df = load_files(test_files)


print("Training:", len(train_df))
print("Development:", len(dev_df))
print("Testing:", len(test_df))


# ============================================================
# CONVERT LABELS TO NUMBERS
# ============================================================

train_df["label"] = train_df["class_label"].map(label2id)
dev_df["label"] = dev_df["class_label"].map(label2id)
test_df["label"] = test_df["class_label"].map(label2id)


# Keep only required columns

train_df = train_df[["tweet_text", "label"]]
dev_df = dev_df[["tweet_text", "label"]]
test_df = test_df[["tweet_text", "label"]]


# ============================================================
# CONVERT TO HUGGING FACE DATASETS
# ============================================================

train_dataset = Dataset.from_pandas(
    train_df,
    preserve_index=False
)

dev_dataset = Dataset.from_pandas(
    dev_df,
    preserve_index=False
)

test_dataset = Dataset.from_pandas(
    test_df,
    preserve_index=False
)


# ============================================================
# TOKENIZER
# ============================================================

print()
print("=" * 60)
print("LOADING DISTILBERT TOKENIZER")
print("=" * 60)

tokenizer = AutoTokenizer.from_pretrained(
    MODEL_NAME
)


def tokenize(batch):

    return tokenizer(
        batch["tweet_text"],
        truncation=True,
        padding="max_length",
        max_length=MAX_LENGTH
    )


print("Tokenizing training data...")

train_dataset = train_dataset.map(
    tokenize,
    batched=True
)

print("Tokenizing development data...")

dev_dataset = dev_dataset.map(
    tokenize,
    batched=True
)

print("Tokenizing testing data...")

test_dataset = test_dataset.map(
    tokenize,
    batched=True
)


# ============================================================
# REMOVE TEXT COLUMN
# ============================================================

train_dataset = train_dataset.remove_columns(
    ["tweet_text"]
)

dev_dataset = dev_dataset.remove_columns(
    ["tweet_text"]
)

test_dataset = test_dataset.remove_columns(
    ["tweet_text"]
)


# ============================================================
# LOAD MODEL
# ============================================================

print()
print("=" * 60)
print("LOADING DISTILBERT MODEL")
print("=" * 60)

model = AutoModelForSequenceClassification.from_pretrained(
    MODEL_NAME,
    num_labels=len(LABELS),
    id2label=id2label,
    label2id=label2id
)

print("Model loaded successfully!")
print("Number of classes:", len(LABELS))


# ============================================================
# METRICS
# ============================================================

def compute_metrics(eval_pred):

    predictions, labels = eval_pred

    predictions = predictions.argmax(axis=-1)

    accuracy = accuracy_score(
        labels,
        predictions
    )

    macro_f1 = f1_score(
        labels,
        predictions,
        average="macro"
    )

    return {
        "accuracy": accuracy,
        "macro_f1": macro_f1
    }


# ============================================================
# TRAINING CONFIGURATION
# ============================================================

print()
print("=" * 60)
print("SETTING UP TRAINING")
print("=" * 60)

training_args = TrainingArguments(

    output_dir=OUTPUT_DIR,

    eval_strategy="epoch",

    save_strategy="epoch",

    learning_rate=2e-5,

    per_device_train_batch_size=8,

    per_device_eval_batch_size=8,

    num_train_epochs=1,

    weight_decay=0.01,

    logging_steps=100,

    load_best_model_at_end=True,

    metric_for_best_model="macro_f1",

    greater_is_better=True,

    report_to="none",

    fp16=False
)


# ============================================================
# TRAINER
# ============================================================

trainer = Trainer(

    model=model,

    args=training_args,

    train_dataset=train_dataset,

    eval_dataset=dev_dataset,

    processing_class=tokenizer,

    compute_metrics=compute_metrics
)


# ============================================================
# TRAIN
# ============================================================

print()
print("=" * 60)
print("STARTING DISTILBERT TRAINING")
print("=" * 60)

trainer.train()


# ============================================================
# DEVELOPMENT EVALUATION
# ============================================================

print()
print("=" * 60)
print("DEVELOPMENT RESULTS")
print("=" * 60)

dev_results = trainer.evaluate(
    dev_dataset
)

print(dev_results)


# ============================================================
# TEST EVALUATION
# ============================================================

print()
print("=" * 60)
print("TEST RESULTS")
print("=" * 60)

test_results = trainer.evaluate(
    test_dataset
)

print(test_results)


# ============================================================
# SAVE MODEL
# ============================================================

print()
print("=" * 60)
print("SAVING MODEL")
print("=" * 60)

trainer.save_model(
    OUTPUT_DIR
)

tokenizer.save_pretrained(
    OUTPUT_DIR
)

print("Model saved to:")
print(OUTPUT_DIR)


# ============================================================
# FINAL SUMMARY
# ============================================================

print()
print("=" * 60)
print("DISTILBERT TRAINING COMPLETED")
print("=" * 60)

print()
print("Baseline:")
print("Accuracy: 73.02%")
print("Macro F1: 69.48%")

print()
print("DistilBERT:")
print(
    "Accuracy:",
    round(test_results["eval_accuracy"] * 100, 2),
    "%"
)

print(
    "Macro F1:",
    round(test_results["eval_macro_f1"] * 100, 2),
    "%"
)