import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { emailAvailabilityCheckThunk, usernameAvailabilityCheckThunk } from "./thunk";

export interface UserState {
  isUsernameAvailable: boolean;
  checkingUsernameAvailable: boolean;
  isEmailAvailable: boolean;
  checkingEmailAvailable: boolean;
}

var initialState: UserState = {
  isUsernameAvailable: false,
  checkingUsernameAvailable: false,
  isEmailAvailable: false,
  checkingEmailAvailable: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userAvailability(
      state: UserState,
      action: PayloadAction<{ value: boolean; field: "username" | "email" }>
    ) {
      if (action.payload.field == "username") {
        state.isUsernameAvailable = action.payload.value;
      } else if (action.payload.field == "email") {
        state.isEmailAvailable = action.payload.value;
      }
    },
  },
  extraReducers: (builder) => {
    // Username availability loading
    builder.addCase(usernameAvailabilityCheckThunk.pending, (state) => {
      state.checkingUsernameAvailable = true;
    });
    builder.addCase(usernameAvailabilityCheckThunk.fulfilled, (state) => {
      state.checkingUsernameAvailable = false;
    });
    builder.addCase(usernameAvailabilityCheckThunk.rejected, (state) => {
      state.checkingUsernameAvailable = false;
    });

    // Email availability loading
    builder.addCase(emailAvailabilityCheckThunk.pending, (state) => {
      state.checkingEmailAvailable = true;
    });
    builder.addCase(emailAvailabilityCheckThunk.fulfilled, (state) => {
      state.checkingEmailAvailable = false;
    });
    builder.addCase(emailAvailabilityCheckThunk.rejected, (state) => {
      state.checkingEmailAvailable = false;
    });
  },
});

export var { userAvailability } = userSlice.actions;
export var userSliceName = userSlice.name;
export default userSlice.reducer;
