import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../";

export interface User {
  id: string;
  email?: string;
  username?: string;
  fullName?: string;
  roles: ("student" | "instructor" | "admin")[];
  isActive: boolean;
  verified: boolean;
  profileImage?: { id?: string; URL: string };
  oauthProviders: { id: string; provider: "google" | "facebook" | "twitter" }[];
  createdAt: string;
  updatedAt: string;
}

interface UserState {
  loading: boolean;
  availability: { username: boolean; email: boolean };
  data?: User | null;
}

var initialState: UserState = {
  loading: false,
  availability: { username: false, email: false },
  data: null,
};

export const userSlice = createSlice({
  name: "_user",
  initialState,
  reducers: {
    updateAvailabilityStatus: (
      state,
      action: PayloadAction<UserState["availability"]>
    ) => {
      state.availability = action.payload;
    },
    updateUserData: (state, action: PayloadAction<User | null>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export var { updateAvailabilityStatus, updateUserData } = userSlice.actions;
export var userSliceName = userSlice.name;
export var selectUserData = (state: RootState) => state._user.data;
export var selectUserLoading = (state: RootState) => state._user.loading;
export var selectUserAvailability = (state: RootState) =>
  state._user.availability;
export default userSlice.reducer;
