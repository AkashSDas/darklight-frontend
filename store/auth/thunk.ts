import toast from "react-hot-toast";
import {
  cancelOAuthSignupService,
  completeOAuthSignupService,
  getNewAccessTokenService,
  ICompleteOAuthSignupPayload,
  ILoginPayload,
  ISignupPayload,
  loginService,
  logoutService,
  signupService,
} from "services/auth";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearUser, updateUser, UserState } from "@store/user/slice";

import { updateAccessToken } from "./slice";

export var signupThunk = createAsyncThunk(
  `auth/signup`,
  async function (payload: ISignupPayload) {
    var response = await signupService(payload);
    if (response.success) toast.success(response.msg);
    else toast.error(response.msg);
  }
);

export var completeOAuthSignupThunk = createAsyncThunk(
  `auth/complete-oauth`,
  async function (payload: ICompleteOAuthSignupPayload) {
    var response = await completeOAuthSignupService(payload);
    if (response.success) {
      toast.success(response.msg);
      return true;
    } else {
      toast.error(response.msg);
      return false;
    }
  }
);

export var cancelOAuthSignupThunk = createAsyncThunk(
  `auth/cancel-oauth`,
  async function (_, { dispatch }) {
    var response = await cancelOAuthSignupService();
    if (response) {
      dispatch(clearUser());
    } else toast.error("Something went wrong, please try again");
  }
);

export var loginThunk = createAsyncThunk(
  `auth/login`,
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

export var getNewAccessTokenThunk = createAsyncThunk(
  `auth/access-token`,
  async function (_, { dispatch }) {
    var response = await getNewAccessTokenService();
    if (response.data?.accessToken) {
      dispatch(updateAccessToken(response.data.accessToken));
      var data = response.data.user;
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
    }
  }
);

export var logoutThunk = createAsyncThunk(
  `auth/logout`,
  async function (_, { dispatch }) {
    var response = await logoutService();
    if (response) {
      dispatch(clearUser());
      dispatch(updateAccessToken(null));
      toast.success("You have been logged out");
    } else {
      toast.error("Something went wrong, please try again");
    }
  }
);
