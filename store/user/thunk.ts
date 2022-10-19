import toast from "react-hot-toast";
import { checkUserAvailabilityService, getLoggedInUserService, instructorSignupService } from "services/user";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "../";
import { updateUser, userAvailability, UserState } from "./slice";

export var usernameAvailabilityCheckThunk = createAsyncThunk(
  `user/username-availability`,
  async function (value: string, { dispatch }) {
    var isAvailable = await checkUserAvailabilityService("username", value);
    dispatch(userAvailability({ field: "username", value: isAvailable }));
  }
);

export var emailAvailabilityCheckThunk = createAsyncThunk(
  `user/email-availability`,
  async function (value: string, { dispatch }) {
    var isAvailable = await checkUserAvailabilityService("email", value);
    dispatch(userAvailability({ field: "email", value: isAvailable }));
  }
);

export var getUserOAuthInfoThunk = createAsyncThunk(
  `user/get-oauth-info`,
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

export var instructorSignupThunk = createAsyncThunk(
  `user/instructor-signup`,
  async function (_, { getState, dispatch }) {
    var token = (getState() as RootState)?.auth?.accessToken;
    var response = await instructorSignupService(token);
    if (response) {
      let user = (getState() as RootState)?.user?.data;
      if (user) {
        dispatch(updateUser({ ...user, roles: [...user.roles, "instructor"] }));
      }
      toast.success("You are now an instructor!");
    } else toast.error("Something went wrong, please try again");
  }
);
