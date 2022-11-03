import toast from "react-hot-toast";
import { cancelOAuthService, CompleteOAuthPayload, completeOAuthService, forgotPasswordService, getNewAccessTokenService, LoginPayload, loginService, logoutService, PasswordResetPayload, passwordResetService, SignupPayload, signupService, verifyEmailService } from "services/_auth";
import { getLoggedInUserService } from "services/_user";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateUserData } from "@store/_user/slice";

import { changeLoginState } from "./slice";

export var signupThunk = createAsyncThunk(
  "_auth/signup",
  async function signup(payload: SignupPayload) {
    var res = await signupService(payload);
    if (res.success) toast.success(res.msg);
    else toast.error(res.msg);
  }
);

export var cancelOAuthThunk = createAsyncThunk(
  "_auth/cancel-oauth",
  async function cancelOAuth(_, { dispatch }) {
    var res = await cancelOAuthService();
    if (res) dispatch(updateUserData(null));
    else toast.error("Something went wrong, please try again");
  }
);

export var completeOAuthThunk = createAsyncThunk(
  "_auth/complete-oauth",
  async function completeOAuth(payload: CompleteOAuthPayload, { dispatch }) {
    var res = await completeOAuthService(payload);
    if (res.success) {
      toast.success(res.msg);
    } else toast.error(res.msg);
  }
);

export var loginThunk = createAsyncThunk(
  "_auth/login",
  async function login(payload: LoginPayload, { dispatch }) {
    var res = await loginService(payload);
    if (res.accessToken) {
      dispatch(changeLoginState(res.accessToken));
      let data = res.user;
      dispatch(
        updateUserData({
          id: data.id,
          email: data.email,
          username: data.username,
          fullName: data.fullName,
          roles: data.roles,
          isActive: data.isActive,
          verified: data.isEmailVerified,
          profileImage: data.profileImage,
          oauthProviders: data.oauthProviders,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        })
      );

      toast.success(res.msg);
    } else {
      toast.error(res.msg);
    }
  }
);

export var getNewAccessTokenThunk = createAsyncThunk(
  "_auth/access-token",
  async function getNewAccessToken(_, { dispatch }) {
    var res = await getNewAccessTokenService();
    if (res.accessToken) {
      dispatch(changeLoginState(res.accessToken));
      let data = res.user;
      dispatch(
        updateUserData({
          id: data.id,
          email: data.email,
          username: data.username,
          fullName: data.fullName,
          roles: data.roles,
          isActive: data.isActive,
          verified: data.isEmailVerified,
          profileImage: data.profileImage,
          oauthProviders: data.oauthProviders,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        })
      );

      toast.success(res.msg);
    }
  }
);

export var getLoggedInUserThunk = createAsyncThunk(
  "_auth/me",
  async function getLoggedInUser(_, { dispatch }) {
    var res = await getLoggedInUserService();
    if (res) {
      let data = res;
      dispatch(
        updateUserData({
          id: data.id,
          email: data.email,
          username: data.username,
          fullName: data.fullName,
          roles: data.roles,
          isActive: data.isActive,
          verified: data.isEmailVerified,
          profileImage: data.profileImage,
          oauthProviders: data.oauthProviders,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        })
      );
    }
  }
);

export var forgotPasswordThunk = createAsyncThunk(
  "_auth/forgot-password",
  async function forgotPassword(email: string) {
    var res = await forgotPasswordService({ email });
    if (res.success) {
      toast.success(res.msg);
    } else toast.error(res.msg);
  }
);

export var passwordResetThunk = createAsyncThunk(
  "_auth/password-reset",
  async function passwordReset(payload: PasswordResetPayload) {
    var res = await passwordResetService(payload);
    if (res.success) {
      toast.success(res.msg);
    } else toast.error(res.msg);
  }
);

export var verifyEmailThunk = createAsyncThunk(
  "_auth/verify-email",
  async function verifyEmail(email: string) {
    var res = await verifyEmailService({ email });
    if (res.success) {
      toast.success(res.msg);
    } else toast.error(res.msg);
  }
);

export var logoutThunk = createAsyncThunk(
  "_auth/logout",
  async function logout(_, { dispatch }) {
    var res = await logoutService();
    if (res) {
      dispatch(changeLoginState(null));
      dispatch(updateUserData(null));
      toast.success("Logged out");
      return true; // logout success
    }

    toast.error("Something went wrong, Please try again");
    return false;
  }
);
