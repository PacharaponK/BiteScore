# sentiment_predict.py
import re
import numpy as np
import tensorflow as tf
from .model_loader import sentiment_model, tokenizer, MAX_LEN  # ใช้จาก model_loader เดียวกัน

def clean_text(text: str) -> str:
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    return text.lower().strip()

def predict_sentiment(text: str) -> dict:
    cleaned = clean_text(text)
    if not cleaned:
        raise ValueError("Text is empty after cleaning")
    
    seq = tokenizer.texts_to_sequences([cleaned])
    pad = tf.keras.preprocessing.sequence.pad_sequences(
        seq, maxlen=MAX_LEN, padding='post', truncating='post'
    )
    pred = sentiment_model.predict(pad, verbose=0)[0][0]
    sentiment = "Positive" if pred > 0.5 else "Negative"
    confidence = float(pred)
    
    return {
        "sentiment": sentiment,
        "confidence": round(confidence * 100, 2),
        "text": text
    }