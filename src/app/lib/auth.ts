import { LoginResponse } from "../types/types";

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

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
  role: "teacher" | "student";
}) {
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
