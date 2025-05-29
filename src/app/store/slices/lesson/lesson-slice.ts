import { Lesson } from "@/app/types/types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/app/lib/api";

interface LessonState {
  currentLesson: Lesson | null;
  selectedDayIndex: number | null; // Tracks current study day
  loading: boolean;
  error?: string;
}

const initialState: LessonState = {
  currentLesson: null,
  selectedDayIndex: null,
  loading: false,
};

export const fetchLessonById = createAsyncThunk<
  { lesson: Lesson },
  { year: string; quarter: string; lesson_id: string }
>("lesson/fetchLessonById", async ({ year, quarter, lesson_id }) => {
  const res = await api.get<{ lesson: Lesson }>(
    `/lessons/${year}/${quarter}/${lesson_id}`,
  );
  if (res.status !== 200) {
    throw new Error("Failed to fetch lesson");
  }
  if (!res.data) {
    throw new Error("Lesson not found");
  }

  // remove all breakpoints from the lesson
  const updatedLesson = {
    ...res.data.lesson,
    daily_sections: res.data.lesson.daily_sections.map((section) => ({
      ...section,
      content: section.content.map((content) => content.replace("\n", " ")),
    })),
  };
  return { lesson: updatedLesson };
});

const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    setLesson(state, action: PayloadAction<Lesson>) {
      state.currentLesson = action.payload;
    },
    setSelectedDay(state, action: PayloadAction<number>) {
      state.selectedDayIndex = action.payload;
    },
    setLessonLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setLessonError(state, action: PayloadAction<string | undefined>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLessonById.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchLessonById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentLesson = action.payload.lesson;
      })
      .addCase(fetchLessonById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setLesson, setSelectedDay, setLessonLoading, setLessonError } =
  lessonSlice.actions;

export default lessonSlice.reducer;
