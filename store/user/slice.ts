import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  username?: string;
  email?: string;
  active: boolean;
  verified: boolean;
  roles: ("student" | "teacher" | "admin")[];
  oauthProviders: {
    id: string;
    provider: "google" | "facebook" | "twitter";
  }[];
  id: string | null;
  createdAt: string;
}

interface UserState {
  accessToken?: string;
  details?: User;
}

var initialState: UserState = {
  accessToken: undefined,
};

var userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
    setDetails(state, action: PayloadAction<User>) {
      state.details = action.payload;
    },
  },
});

export var { setAccessToken, setDetails } = userSlice.actions;

export default userSlice.reducer;
