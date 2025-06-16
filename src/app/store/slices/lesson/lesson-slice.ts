import { LastPosition } from "@/app/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LessonState {
  currentLesson: LastPosition | null; // Holds the current lesson data
  loading: boolean;
  error?: string;
}

const initialState: LessonState = {
  currentLesson: null,
  loading: false,
};

const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    setLessonAction(state, action: PayloadAction<LastPosition | null>) {
      state.currentLesson = action.payload;
    },

    setLessonLoadingAction(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setLessonErrorAction(state, action: PayloadAction<string | undefined>) {
      state.error = action.payload;
    },
  },
});

export const { setLessonAction, setLessonLoadingAction, setLessonErrorAction } =
  lessonSlice.actions;

export default lessonSlice.reducer;
