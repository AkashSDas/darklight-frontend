import toast from "react-hot-toast";
import { cancelOAuthSignupService, completeOAuthSignupService, ICompleteOAuthSignupPayload, ISignupPayload, signupService } from "services/auth";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearUser } from "@store/user/slice";

import { authSliceName } from "./slice";

export var signupThunk = createAsyncThunk(
  `${authSliceName}/signup`,
  async function (payload: ISignupPayload) {
    var response = await signupService(payload);
    if (response.success) toast.success(response.msg);
    else toast.error(response.msg);
  }
);

export var completeOAuthSignupThunk = createAsyncThunk(
  `${authSliceName}/complete-oauth`,
  async function (payload: ICompleteOAuthSignupPayload) {
    var response = await completeOAuthSignupService(payload);
    if (response.success) toast.success(response.msg);
    else toast.error(response.msg);
  }
);

export var cancelOAuthSignupThunk = createAsyncThunk(
  `${authSliceName}/cancel-oauth`,
  async function (_, { dispatch }) {
    var response = await cancelOAuthSignupService();
    if (response) {
      dispatch(clearUser());
    } else toast.error("Something went wrong, please try again");
  }
);
