import {
  HomeLastPosition,
  HomeStudyProgress,
  LoginResponse,
  ProgressSummary,
  User,
} from "@/app/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  user: User;
  access_token: string | null;
  token_type: "bearer" | null;
  records: {
    progress: ProgressSummary | null;
    lastPosition: HomeLastPosition | null;
    lessonProgress: HomeStudyProgress | null;
  };
  recordsLoading: boolean;
  recordsError: string | null;
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
  records: {
    progress: null,
    lastPosition: null,
    lessonProgress: null,
  },
  recordsLoading: false,
  recordsError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginResponse>) {
      const { access_token, token_type, user } = action.payload;
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
      }>
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
    setRecordsLoading(state, action: PayloadAction<boolean>) {
      state.recordsLoading = action.payload;
    },
    setProgressSummary(state, action: PayloadAction<ProgressSummary | null>) {
      state.records.progress = action.payload;
    },
    setLastPosition(state, action: PayloadAction<HomeLastPosition | null>) {
      state.records.lastPosition = action.payload;
    },
    setLessonProgress(state, action: PayloadAction<HomeStudyProgress | null>) {
      state.records.lessonProgress = action.payload;
    },
    setRecordsError(state, action: PayloadAction<string | null>) {
      state.recordsError = action.payload;
    },
  },
});

export const {
  login,
  logout,
  signup,
  setRecordsLoading,
  setProgressSummary,
  setLastPosition,
  setLessonProgress,
  setRecordsError,
} = userSlice.actions;
export default userSlice.reducer;
