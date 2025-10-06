# model_loader.py
import tensorflow as tf
import pickle
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
MODEL_DIR = BASE_DIR / "model"

# ========================
# 1. Food Image Classifier
# ========================
FOOD_MODEL_PATH = MODEL_DIR / "food_classifier_5class.keras"
if not FOOD_MODEL_PATH.exists():
    raise FileNotFoundError(f"Food classifier model not found: {FOOD_MODEL_PATH}")

food_model = tf.keras.models.load_model(str(FOOD_MODEL_PATH))
FOOD_CLASS_NAMES = ['apple_pie', 'hamburger', 'ice_cream', 'pizza', 'sushi']

# ========================
# 2. Sentiment Analyzer
# ========================
SENTIMENT_MODEL_PATH = MODEL_DIR / "food_review_sentiment_model.h5"
TOKENIZER_PATH = MODEL_DIR / "tokenizer_sentiment.pickle"

if not SENTIMENT_MODEL_PATH.exists():
    raise FileNotFoundError(f"Sentiment model not found: {SENTIMENT_MODEL_PATH}")
if not TOKENIZER_PATH.exists():
    raise FileNotFoundError(f"Tokenizer not found: {TOKENIZER_PATH}")

sentiment_model = tf.keras.models.load_model(str(SENTIMENT_MODEL_PATH))

with open(TOKENIZER_PATH, 'rb') as f:
    tokenizer = pickle.load(f)

MAX_LEN = 100  # ต้องตรงกับตอน train