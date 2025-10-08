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

# Mapping ชื่อ class เป็นชื่ออาหารที่เหมาะสมกับการแสดงผล
FOOD_DISPLAY_NAMES = {
    'apple_pie': 'Apple Pie',
    'hamburger': 'Hamburger', 
    'ice_cream': 'Ice Cream',
    'pizza': 'Pizza',
    'sushi': 'Sushi'
}

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

# ========================
# 3. Food Text Recommender (NEW)
# ========================
TEXT_RECOMMENDER_MODEL_PATH = MODEL_DIR / "food_text_recommender.keras"
TEXT_TOKENIZER_PATH = MODEL_DIR / "tokenizer_text.pkl"
TEXT_LABEL_ENCODER_PATH = MODEL_DIR / "label_encoder_text.pkl"

if not TEXT_RECOMMENDER_MODEL_PATH.exists():
    raise FileNotFoundError(f"Text recommender model not found: {TEXT_RECOMMENDER_MODEL_PATH}")
if not TEXT_TOKENIZER_PATH.exists():
    raise FileNotFoundError(f"Text tokenizer not found: {TEXT_TOKENIZER_PATH}")
if not TEXT_LABEL_ENCODER_PATH.exists():
    raise FileNotFoundError(f"Text label encoder not found: {TEXT_LABEL_ENCODER_PATH}")

food_text_model = tf.keras.models.load_model(str(TEXT_RECOMMENDER_MODEL_PATH))

with open(TEXT_TOKENIZER_PATH, 'rb') as f:
    food_text_tokenizer = pickle.load(f)

with open(TEXT_LABEL_ENCODER_PATH, 'rb') as f:
    food_text_label_encoder = pickle.load(f)

MAX_TEXT_LEN = 50  # ต้องตรงกับตอน train ใน Colab