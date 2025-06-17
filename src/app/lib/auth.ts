/* eslint-disable no-undef */
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
    const { access_token, token_type } = response.data;
    const token = `${token_type} ${access_token}`;
    localStorage.setItem("authToken", token);
    api.defaults.headers.common["Authorization"] = token;
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

export function initAuth() {
  const token = localStorage.getItem("authToken");
  if (token) {
    api.defaults.headers.common["Authorization"] = token;
  }
}

/**
 * Retrieves the stored Authorization token (Bearer ...) for API requests.
 * @returns The full token string or null if not set.
 */
export function getAuthToken(): string | null {
  if (typeof localStorage === "undefined") {
    return null;
  }
  return localStorage.getItem("authToken");
}
