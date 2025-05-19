import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LessonMetadataResponse } from "@/types/types";
import api from "@/lib/api";

interface LessonsState {
  all: LessonMetadataResponse[];
  loading: boolean;
  error?: string;
}

const initialState: LessonsState = {
  all: [],
  loading: false,
};

export const fetchAllLessons = createAsyncThunk<LessonMetadataResponse[]>(
  "lessons/fetchAll",
  async () => {
    const res = await api.get("/lessons");
    return res.data;
  },
);

const lessonsSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {
    setLessons(state, action: PayloadAction<LessonMetadataResponse[]>) {
      state.all = action.payload;
    },
    setLessonsLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setLessonsError(state, action: PayloadAction<string | undefined>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllLessons.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchAllLessons.fulfilled, (state, action) => {
        state.loading = false;
        state.all = action.payload;
      })
      .addCase(fetchAllLessons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setLessons, setLessonsLoading, setLessonsError } =
  lessonsSlice.actions;

export default lessonsSlice.reducer;
