import { AxiosRequestConfig } from "axios";
import toast from "react-hot-toast";

import { normalizeUser } from "@lib/response";
import fetchAPI from "@lib/service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateUserData } from "@store/user/slice";

import { changeLoginState } from "./slice";

function fetchFromAuth(endpoint: string, opts: AxiosRequestConfig<any>) {
  const BASE_URL = "/auth";
  return fetchAPI(`${BASE_URL}${endpoint}`, opts);
}

const WENT_WRONG_MSG = "Something went wrong, please try again";

// ================================
// Signup Thunks
// ================================

export var signupThunk = createAsyncThunk(
  "auth/signup",
  async function signup(data: {
    username: string;
    email: string;
    password: string;
  }) {
    var res = await fetchFromAuth("/signup", { method: "post", data });

    if ((res.status < 300 || res.status >= 500) && res.data) {
      toast.success("Your account is created");
    } else {
      toast.error(res.msg);
    }
  }
);

export var cancelOAuthThunk = createAsyncThunk(
  "auth/cancel-oauth",
  async function cancelOAuth(_, { dispatch }) {
    var res = await fetchFromAuth("/cancel-oauth", { method: "post" });

    if (res.status < 300) dispatch(updateUserData(null));
    else toast.error(WENT_WRONG_MSG);
  }
);

export var completeOAuthThunk = createAsyncThunk(
  "auth/complete-oauth",
  async function completeOAuth(data: { email: string; username: string }) {
    var res = await fetchFromAuth("/complete-oauth", { method: "post", data });

    if (res.status < 300) {
      toast.success("Your account is created");
    } else {
      toast.error(res.msg);
    }
  }
);

// ================================
// Login Thunks
// ================================

export var loginThunk = createAsyncThunk(
  "auth/login",
  async function login(
    data: { email: string; password: string },
    { dispatch }
  ) {
    var res = await fetchFromAuth("/login", { method: "post", data });

    if (res.status < 300 && res.data) {
      dispatch(updateUserData(normalizeUser(res.data.user)));
      dispatch(changeLoginState(res.data.accessToken));
      toast.success("Welcome back");
    } else {
      toast.error(res.msg);
    }
  }
);

export var getNewAccessTokenThunk = createAsyncThunk(
  "auth/access-token",
  async function getNewAccessToken(_, { dispatch }) {
    var res = await fetchFromAuth("/access-token", { method: "get" });

    if (res.status < 300 && res.data) {
      dispatch(updateUserData(normalizeUser(res.data.user)));
      dispatch(changeLoginState(res.data.accessToken));
    }
  }
);

export var getLoggedInUserThunk = createAsyncThunk(
  "auth/me",
  async function getLoggedInUser(_, { dispatch }) {
    var res = await fetchAPI("/user/me", { method: "get" });

    if (res.status < 300 && res.data) {
      dispatch(updateUserData(normalizeUser(res.data?.user ?? null)));
    }
  }
);

// ================================
// Password Reset Thunks
// ================================

export var forgotPasswordThunk = createAsyncThunk(
  "auth/forgot-password",
  async function forgotPassword(data: { email: string }) {
    var res = await fetchFromAuth("/forgot-password", { method: "post", data });

    if (res.status < 300) {
      toast.success("Password reset link sent to your email");
    } else {
      toast.error(res.msg);
    }
  }
);

export var passwordResetThunk = createAsyncThunk(
  "auth/password-reset",
  async function passwordReset({
    token,
    data,
  }: {
    token: string;
    data: { password: string; confirmPassword: string };
  }) {
    var res = await fetchFromAuth(`/reset-password/${token}`, {
      method: "post",
      data,
    });

    if (res.status < 300) {
      toast.success("Password reset successful");
    } else {
      toast.error(res.msg);
    }
  }
);

// ================================
// Other Auth Thunks
// ================================

export var verifyEmailThunk = createAsyncThunk(
  "auth/verify-email",
  async function verifyEmail(data: { email: string }) {
    var res = await fetchFromAuth("/verify-email", { method: "post", data });

    if (res.status < 300) {
      toast.success("Verification link sent to your email");
    } else {
      toast.error(res.msg);
    }
  }
);

export var logoutThunk = createAsyncThunk(
  "auth/logout",
  async function logout(_, { dispatch }) {
    var res = await fetchFromAuth("/logout", { method: "post" });

    if (res.status < 300) {
      dispatch(updateUserData(null));
      dispatch(changeLoginState(null));
      toast.success("Logged out");
      return true;
    } else {
      toast.error(WENT_WRONG_MSG);
      return false;
    }
  }
);
