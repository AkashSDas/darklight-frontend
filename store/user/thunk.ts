import { checkUserAvailabilityService, getLoggedInUserService } from "services/user";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { updateUser, userAvailability, userSliceName, UserState } from "./slice";

export var usernameAvailabilityCheckThunk = createAsyncThunk(
  `${userSliceName}/username-availability`,
  async function (value: string, { dispatch }) {
    var isAvailable = await checkUserAvailabilityService("username", value);
    dispatch(userAvailability({ field: "username", value: isAvailable }));
  }
);

export var emailAvailabilityCheckThunk = createAsyncThunk(
  `${userSliceName}/email-availability`,
  async function (value: string, { dispatch }) {
    var isAvailable = await checkUserAvailabilityService("email", value);
    dispatch(userAvailability({ field: "email", value: isAvailable }));
  }
);

export var getUserOAuthInfoThunk = createAsyncThunk(
  `${userSliceName}/get-oauth-info`,
  async function (_, { dispatch }) {
    var response = await getLoggedInUserService();
    if (response) {
      var user: UserState["data"] = {
        id: response.id,
        fullName: response.fullName,
        username: response.username,
        email: response.email,
        isEmailVerified: response.isEmailVerified,
        isActive: response.isActive,
        roles: response.roles,
        createdAt: response.createdAt,
        profileImage: response.profileImage,
        oauthProviders: response.oauthProviders,
      };

      dispatch(updateUser(user));
    }
  }
);
