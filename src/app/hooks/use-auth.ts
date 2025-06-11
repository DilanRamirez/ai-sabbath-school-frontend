// src/app/hooks/use-auth.ts
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { loginUser, registerUser } from "../lib/auth";
import { useAppDispatch } from "../store/hooks";
import { login as loginAction } from "../store/slices/user/user-slice";
import { LoginResponse, RegisterRequest, User } from "../types/types";
import { useCallback } from "react";

/**
 * Save authentication data to cookies and localStorage.
 */
function persistAuthData(token: string, user: User): void {
  Cookies.set("token", token);
  // eslint-disable-next-line no-undef
  localStorage.setItem("user", JSON.stringify(user));
}

/**
 * Common post-authentication steps: update store and navigate.
 */
function handleAuthSuccess(
  dispatch: ReturnType<typeof useAppDispatch>,
  router: ReturnType<typeof useRouter>,
  data: LoginResponse,
): void {
  const { access_token, token_type, user } = data;
  persistAuthData(access_token, user);
  dispatch(
    loginAction({
      access_token,
      token_type,
      user,
    }),
  );
  router.push("/home");
}

/**
 * Custom hook for authentication actions.
 */
export function useAuth() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  /**
   * Log in a user with email and password.
   * @throws {Error} If login fails or inputs are invalid.
   */
  const login = useCallback(
    async (email: string, password: string): Promise<void> => {
      if (!email || !password) {
        throw new Error("Email and password are required.");
      }
      try {
        const response = await loginUser(email.trim(), password);
        handleAuthSuccess(dispatch, router, response);
      } catch (err: any) {
        console.error("Login error:", err);
        // Surface user-friendly message
        throw new Error(
          err?.message || "No se pudo iniciar sesión. Inténtalo de nuevo.",
        );
      }
    },
    [dispatch, router],
  );

  /**
   * Register a new user.
   * @param name - Full name of the user.
   * @param email - User's email address.
   * @param password - Desired password.
   * @param isTeacher - Whether the user is a teacher.
   * @throws {Error} If registration fails or inputs are invalid.
   */
  const register = useCallback(
    async (
      name: string,
      email: string,
      password: string,
      isTeacher: boolean,
    ): Promise<void> => {
      if (!name || !email || !password) {
        throw new Error("Nombre, correo y contraseña son obligatorios.");
      }
      const payload: RegisterRequest = {
        name: name.trim(),
        email: email.trim(),
        password,
        role: isTeacher ? "teacher" : "student",
      };
      try {
        const response = await registerUser(payload);
        handleAuthSuccess(dispatch, router, {
          access_token: response.access_token,
          token_type: response.token_type,
          user: response.user,
        });
      } catch (err: any) {
        console.error("Registration error:", err);
        throw new Error(
          err?.message || "No se pudo registrar. Inténtalo de nuevo.",
        );
      }
    },
    [dispatch, router],
  );

  /**
   * Log out the current user.
   */
  const logout = useCallback((): void => {
    Cookies.remove("token");
    // eslint-disable-next-line no-undef
    localStorage.removeItem("user");
    dispatch(
      loginAction({
        access_token: "",
        token_type: "bearer",
        user: { name: "", email: "", role: "student", isLoggedIn: false },
      }),
    );
    router.push("/login");
  }, [dispatch, router]);

  return { login, register, logout };
}
