# main.py
from fastapi import FastAPI, File, UploadFile, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from .predict_food import preprocess_image, predict_food
from .sentimemt_predict import predict_sentiment
from .text_food_predict import predict_food_from_text

app = FastAPI(title="Food Classifier & Sentiment API")

# CORS สำหรับ Next.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Image Classification ---
@app.get("/")
def read_root():
    return {"message": "Welcome to Food AI API"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        image_array = preprocess_image(file)
        result = predict_food(image_array)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# --- Sentiment Analysis ---
class ReviewRequest(BaseModel):
    text: str

@app.post("/predict_sentiment")
def predict_review_sentiment(request: ReviewRequest):
    try:
        result = predict_sentiment(request.text)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
# --- Text-based Food Recommendation ---
class FoodTextRequest(BaseModel):
    text: str

@app.post("/recommend_food")
def recommend_food(request: FoodTextRequest):
    try:
        result = predict_food_from_text(request.text)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))