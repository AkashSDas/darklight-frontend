import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { signupThunk } from "./thunk";

export interface AuthState {
  signupLoading: boolean;
}

var initialState: AuthState = {
  signupLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Signup loading
    builder.addCase(signupThunk.pending, (state) => {
      state.signupLoading = true;
    });
    builder.addCase(signupThunk.fulfilled, (state) => {
      state.signupLoading = false;
    });
    builder.addCase(signupThunk.rejected, (state) => {
      state.signupLoading = false;
    });
  },
});

export var authSliceName = authSlice.name;
export default authSlice.reducer;
