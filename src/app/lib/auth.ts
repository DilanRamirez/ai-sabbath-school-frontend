import {
  LoginResponse,
  RegisterRequest,
  UserStudyProgressResponse,
} from "../types/types";
import api from "./api";

// src/lib/api/auth.ts
export async function loginUser(
  email: string,
  password: string,
): Promise<LoginResponse> {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
}

export async function registerUser(data: RegisterRequest) {
  try {
    const response = await api.post("/auth/signup", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
}

export async function getUserStudyData(
  userId: string,
): Promise<UserStudyProgressResponse> {
  try {
    const response = await api.get(`/study/progress/${userId}`);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.detail || error.response?.data?.message;
    if (message?.includes("No progress records found for user")) {
      return [];
    }
    console.error("Error fetching user data:", message);
    throw new Error(message || "Failed to fetch user data");
  }
}
