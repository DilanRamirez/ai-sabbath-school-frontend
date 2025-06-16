import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user/user-slice";
import lessonReducer from "./slices/lesson/lesson-slice";
import lessonsReducer from "./slices/lessons/lessons-slice";
import quarterReducer from "./slices/quarters/quarters-slice";
import themeReducer from "./slices/theme/theme-slice";
import { logger } from "./logger";

declare var process: {
  env: {
    NODE_ENV: string;
  };
};

const isDev = process.env.NODE_ENV === "development";

export const store = configureStore({
  reducer: {
    user: userReducer,
    lesson: lessonReducer,
    lessons: lessonsReducer,
    quarters: quarterReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    isDev ? getDefaultMiddleware().concat(logger) : getDefaultMiddleware(),
});

// Infer typed hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
