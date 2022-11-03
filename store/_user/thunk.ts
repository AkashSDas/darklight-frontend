import toast from "react-hot-toast";
import { instructorSignupService, UserExistsPayload, userExistsService } from "services/_user";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "../";
import { updateAvailabilityStatus, updateUserData } from "./slice";

export var userExistsThunk = createAsyncThunk(
  "_user/available",
  async function userExists(
    { field, value }: UserExistsPayload,
    { getState, dispatch }
  ) {
    var { availability } = (getState() as RootState)._user;
    var available = await userExistsService({ field, value });
    dispatch(updateAvailabilityStatus({ ...availability, [field]: available }));
  }
);

export var instructorSignupThunk = createAsyncThunk(
  "_user/instructor-signup",
  async function instructorSignup(_, { getState, dispatch }) {
    var { accessToken } = (getState() as RootState)._auth;
    if (!accessToken) return toast.error("You are not logged in");

    var res = await instructorSignupService(accessToken);

    if (res) {
      let user = (getState() as RootState)._user.data;
      if (user) {
        dispatch(
          updateUserData({ ...user, roles: [...user.roles, "instructor"] })
        );

        return toast.success("You are now an instructor!");
      }
    }

    toast.error(res.msg);
  }
);
