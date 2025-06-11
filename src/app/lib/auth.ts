import {
  LoginResponse,
  RegisterRequest,
  UserStudyProgressResponse,
} from "../types/types";

// src/lib/api/auth.ts
export async function loginUser(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  return response.json(); // e.g., { token, user }
}

export async function registerUser(data: RegisterRequest) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signup`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Registration failed");
  }

  return response.json(); // e.g., { user }
}

export async function getUserStudyData(
  userId: string,
): Promise<UserStudyProgressResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/study/progress/${userId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      // If no progress records are found, return an empty array instead of throwing
      if (
        errorData.detail &&
        errorData.detail.includes("No progress records found for user")
      ) {
        return [];
      }
      throw new Error(
        errorData.message || errorData.detail || "Failed to fetch user data",
      );
    }

    const data: UserStudyProgressResponse = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error fetching user data:", error.message);
    throw new Error(error.message);
  }
}
