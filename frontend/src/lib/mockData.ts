// Mock data for AI models
export const FOOD_TYPES = [
  "Pizza",
  "Sushi",
  "Burger",
  "Pad Thai",
  "Salad",
  "Ramen",
  "Tacos",
  "Pasta",
  "Fried Rice",
  "Steak",
  "Curry",
  "Sandwich",
  "Dim Sum",
  "Pho",
  "Kebab",
];

export const SENTIMENTS = ["Positive", "Negative"] as const;

export type Sentiment = (typeof SENTIMENTS)[number];

export interface AnalysisResult {
  id: string;
  foodType: string;
  sentiment: Sentiment;
  comment: string;
  imageUrl: string;
  timestamp: number;
}

// Mock AI Classification
export const mockFoodClassification = (): string => {
  const randomIndex = Math.floor(Math.random() * FOOD_TYPES.length);
  return FOOD_TYPES[randomIndex];
};

// Mock Sentiment Analysis
export const mockSentimentAnalysis = (): Sentiment => {
  const randomIndex = Math.floor(Math.random() * SENTIMENTS.length);
  return SENTIMENTS[randomIndex];
};

// Simulate AI processing delay
export const simulateAIProcessing = (ms: number = 1500): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
