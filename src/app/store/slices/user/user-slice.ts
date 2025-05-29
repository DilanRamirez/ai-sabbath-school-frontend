import { LoginResponse, User } from "@/app/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sign } from "node:crypto";

export interface UserState {
  user: User;
  access_token: string | null;
  token_type: "bearer" | null;
}

const initialState: UserState = {
  user: {
    name: "",
    email: "",
    role: "student", // Default role, can be changed on login
    studyGroupId: undefined, // Optional, can be set later
    isLoggedIn: false, // Track login state
  },
  access_token: null,
  token_type: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginResponse>) {
      const { access_token, token_type, user } = action.payload;
      console.log("Login action payload:", action.payload);
      state.access_token = access_token;
      state.token_type = token_type;
      state.user = {
        ...user,
        studyGroupId: user.studyGroupId || undefined, // Ensure studyGroupId is optional
      };
      state.user.isLoggedIn = true; // Add isLoggedIn property
    },
    logout(state) {
      state.access_token = null;
      state.token_type = null;
      state.user = {
        name: "",
        email: "",
        role: "student",
        studyGroupId: undefined,
        isLoggedIn: false,
      };
    },
    signup(
      state,
      action: PayloadAction<{
        user: User;
        access_token: string;
        token_type: "bearer";
      }>,
    ) {
      const { user, access_token, token_type } = action.payload;
      state.access_token = access_token;
      state.token_type = token_type;
      state.user = {
        ...user,
        studyGroupId: user.studyGroupId || undefined, // Ensure studyGroupId is optional
        isLoggedIn: true, // Add isLoggedIn property
      };
    },
  },
});

export const { login, logout, signup } = userSlice.actions;
export default userSlice.reducer;
