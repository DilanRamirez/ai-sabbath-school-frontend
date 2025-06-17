// src/hooks/useHydrateUser.ts
import { useEffect } from "react";
import { login } from "@/app/store/slices/user/user-slice";
import Cookies from "js-cookie";
import { useAppDispatch } from "../store/hooks";
import { initAuth } from "@/app/lib/auth";

export function useHydrate() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Initialize API client with stored token
    initAuth();
    const token = Cookies.get("token");
    // eslint-disable-next-line no-undef
    const userRaw = localStorage.getItem("user");

    if (token && userRaw) {
      const user = JSON.parse(userRaw);
      dispatch(
        login({
          access_token: token,
          token_type: "bearer",
          user,
        }),
      );
    }
  }, [dispatch]);
}
