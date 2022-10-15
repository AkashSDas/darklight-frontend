import toast from "react-hot-toast";
import {
  cancelOAuthSignupService,
  completeOAuthSignupService,
  ICompleteOAuthSignupPayload,
  ILoginPayload,
  ISignupPayload,
  loginService,
  signupService,
} from "services/auth";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearUser, updateUser, UserState } from "@store/user/slice";

import { authSliceName, updateAccessToken } from "./slice";

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

export var loginThunk = createAsyncThunk(
  `${authSliceName}/login`,
  async function (payload: ILoginPayload, { dispatch }) {
    var response = await loginService(payload);
    if (response.data) {
      dispatch(updateAccessToken(response.data.accessToken));
      var data = response.data;
      var user: UserState["data"] = {
        id: data.id,
        fullName: data.fullName,
        username: data.username,
        email: data.email,
        isEmailVerified: data.isEmailVerified,
        isActive: data.isActive,
        roles: data.roles,
        createdAt: data.createdAt,
        profileImage: data.profileImage,
        oauthProviders: data.oauthProviders,
      };
      dispatch(updateUser(user));

      toast.success(response.msg);
    } else toast.error(response.msg);
  }
);
