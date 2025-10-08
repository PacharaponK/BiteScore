# predict.py
from fastapi import UploadFile
from PIL import Image
import numpy as np
from io import BytesIO
from .model_loader import food_model, FOOD_CLASS_NAMES, FOOD_DISPLAY_NAMES  # เปลี่ยนชื่อให้ชัด

IMG_SIZE = 224

def preprocess_image(file: UploadFile) -> np.ndarray:
    image = Image.open(BytesIO(file.file.read())).convert("RGB")
    image = image.resize((IMG_SIZE, IMG_SIZE))
    image_array = np.array(image) / 255.0
    return np.expand_dims(image_array, axis=0)

def predict_food(image_array: np.ndarray) -> dict:
    predictions = food_model.predict(image_array)
    predicted_index = np.argmax(predictions[0])
    confidence = float(predictions[0][predicted_index])
    predicted_class = FOOD_CLASS_NAMES[predicted_index]
    display_name = FOOD_DISPLAY_NAMES[predicted_class]
    return {
        "food": display_name,
        "confidence": round(confidence * 100, 2)
    }