import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BuyCourseState {
  showDynamicHeader: boolean;
}

export var initialState: BuyCourseState = {
  showDynamicHeader: false,
};

export const buyCourseSlice = createSlice({
  name: "buy-course",
  initialState,
  reducers: {
    setShowDynamicHeader: (state, action: PayloadAction<boolean>) => {
      state.showDynamicHeader = action.payload;
    },
  },
});

export var { setShowDynamicHeader } = buyCourseSlice.actions;

export default buyCourseSlice.reducer;
