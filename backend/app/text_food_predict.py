# text_food_predict.py
import re
import numpy as np
from tensorflow.keras.preprocessing.sequence import pad_sequences
from .model_loader import (
    food_text_model,
    food_text_tokenizer,
    food_text_label_encoder,
    MAX_TEXT_LEN,
    FOOD_DISPLAY_NAMES  # ใช้ mapping ชื่อแสดงผลเดียวกัน
)

def clean_text(text: str) -> str:
    text = text.lower()
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    return text.strip()

def predict_food_from_text(text: str):
    if not text.strip():
        raise ValueError("Input text is empty")
    
    cleaned = clean_text(text)
    if not cleaned:
        raise ValueError("Text contains no valid words")
    
    # Tokenize
    seq = food_text_tokenizer.texts_to_sequences([cleaned])
    if not seq[0]:
        raise ValueError("No known words found in input")
    
    # Pad
    padded = pad_sequences(seq, maxlen=MAX_TEXT_LEN, padding='post')
    
    # Predict
    pred = food_text_model.predict(padded, verbose=0)
    confidence = float(np.max(pred))
    predicted_idx = int(np.argmax(pred, axis=1)[0])
    class_name = food_text_label_encoder.inverse_transform([predicted_idx])[0]
    display_name = FOOD_DISPLAY_NAMES.get(class_name, class_name)
    
    return {
        "food_class": class_name,
        "food_name": display_name,
        "confidence": round(confidence, 4)
    }