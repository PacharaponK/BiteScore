import { AnalysisResult } from "./mockData";

const STORAGE_KEY = "ai-food-reviews";

export const saveAnalysis = (analysis: AnalysisResult): void => {
  try {
    const existing = getAnalysisHistory();
    const updated = [analysis, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Failed to save analysis:", error);
  }
};

export const getAnalysisHistory = (): AnalysisResult[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load analysis history:", error);
    return [];
  }
};

export const clearAnalysisHistory = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear analysis history:", error);
  }
};
