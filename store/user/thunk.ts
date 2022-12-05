import toast from "react-hot-toast";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { getNewAccessToken } from "../../services/auth.service";
import { setAccessToken, setDetails } from "./slice";

export var getNewAccessTokenThunk = createAsyncThunk(
  "auth/access-token",
  async function getLoggedInUser(_, { dispatch }) {
    var { success, user, accessToken } = await getNewAccessToken();
    if (success) {
      dispatch(setAccessToken(accessToken));
      dispatch(setDetails(user));
    } else toast.error("Session exipired, please login again.");
  }
);
