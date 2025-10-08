// API configuration
const API_BASE_URL = "http://localhost:8000";

// API response types
export interface FoodPredictionResponse {
  food: string;
  confidence: number;
}

export interface SentimentPredictionResponse {
  sentiment: string;
  confidence: number;
  text: string;
}

export interface FoodRecommendationResponse {
  food_class: string;
  food_name: string;
  confidence: number;
}

// Predict food from image
export async function predictFood(file: File): Promise<FoodPredictionResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to predict food");
  }

  return response.json();
}

// Predict sentiment from text
export async function predictSentiment(
  text: string
): Promise<SentimentPredictionResponse> {
  const response = await fetch(`${API_BASE_URL}/predict_sentiment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to predict sentiment");
  }

  return response.json();
}

// Recommend food based on text description
export async function recommendFood(
  text: string
): Promise<FoodRecommendationResponse> {
  const response = await fetch(`${API_BASE_URL}/recommend_food`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to recommend food");
  }

  return response.json();
}
