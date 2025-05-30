import { Quarter } from "@/app/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuartersState {
  quarters: Quarter[];
  loading: boolean;
  error: string | null;
}

const initialState: QuartersState = {
  quarters: [],
  loading: false,
  error: null,
};

const quartersSlice = createSlice({
  name: "quarters",
  initialState,
  reducers: {
    loadQuarters(state, action: PayloadAction<Quarter[]>) {
      state.quarters = action.payload;
      state.loading = false;
      state.error = null;
    },
    loadQuartersLoading(state) {
      state.loading = true;
      state.error = null;
    },
    loadQuartersError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { loadQuarters, loadQuartersLoading, loadQuartersError } =
  quartersSlice.actions;
export default quartersSlice.reducer;
