import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const API_BASE_URL = "http://localhost:8000"; // URL ของ Backend API

/**
 * เรียก API เพื่อทำการอัปโหลดรูปภาพและรับผลลัพธ์การคาดการณ์
 * @param file - ไฟล์รูปภาพที่ต้องการอัปโหลด
 */
export async function uploadImageAndPredict(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${API_BASE_URL}/predict`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

/**
 * เรียก API เพื่อวิเคราะห์ Sentiment ของข้อความ
 * @param text - ข้อความที่ต้องการวิเคราะห์
 */
export async function predictSentiment(text: string) {
  try {
    const response = await axios.post(`${API_BASE_URL}/predict_sentiment`, {
      text,
    });
    return response.data;
  } catch (error) {
    console.error("Error predicting sentiment:", error);
    throw error;
  }
}
