// src/hooks/useAuth.ts
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { loginUser, registerUser } from "../lib/auth";
import { useAppDispatch } from "../store/hooks";
import { login } from "../store/slices/user/user-slice";
import { LoginResponse } from "../types/types";

export function useAuth() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const _login = async (email: string, password: string) => {
    const { token_type, access_token, user }: LoginResponse = await loginUser(
      email,
      password,
    );
    Cookies.set("token", access_token);
    // eslint-disable-next-line no-undef
    localStorage.setItem("user", JSON.stringify(user));
    dispatch(
      login({
        access_token,
        token_type,
        user,
      }),
    );
    router.push("/quarters");
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    isTeacher: boolean,
  ) => {
    const response = await registerUser({
      name,
      email,
      password,
      role: isTeacher ? "teacher" : "student",
    });

    const { user, access_token, token_type } = response;
    Cookies.set("token", access_token);
    // eslint-disable-next-line no-undef
    localStorage.setItem("user", JSON.stringify(user));
    dispatch(
      login({
        access_token,
        token_type,
        user,
      }),
    );
    router.push("/quarters");
  };

  const logout = () => {
    Cookies.remove("token");
    dispatch(
      login({
        access_token: "",
        token_type: "bearer",
        user: {
          name: "",
          email: "",
          role: "student",
          isLoggedIn: false,
        },
      }),
    );
    router.push("/login");
  };

  return { login: _login, register, logout };
}
