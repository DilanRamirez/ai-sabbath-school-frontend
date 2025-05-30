import { LessonsResponse } from "@/app/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LessonsState {
  lessons: LessonsResponse[];
  loading: boolean;
  error: string | null;
}

const initialState: LessonsState = {
  lessons: [],
  loading: false,
  error: null,
};

const lessonsSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {
    loadLessons(state, action: PayloadAction<LessonsResponse[]>) {
      state.lessons = action.payload;
      state.loading = false;
      state.error = null;
    },
    loadLessonsLoading(
      state,
      action: PayloadAction<{
        loading: boolean;
      }>,
    ) {
      state.loading = action.payload.loading;
      state.error = null;
    },
    loadLessonsError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { loadLessons, loadLessonsLoading, loadLessonsError } =
  lessonsSlice.actions;
export default lessonsSlice.reducer;
