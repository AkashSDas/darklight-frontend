import { checkUserAvailabilityService } from "services/user";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { userAvailability, userSliceName } from "./slice";

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
