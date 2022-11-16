import { AxiosRequestConfig } from "axios";
import toast from "react-hot-toast";
import fetchAPI from "services";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "../";
import { updateAvailabilityStatus, updateUserData } from "./slice";

function fetchFromUser(endpoint: string, opts: AxiosRequestConfig) {
  const BASE_URL = "/user";
  return fetchAPI(`${BASE_URL}${endpoint}`, opts);
}

export var userExistsThunk = createAsyncThunk(
  "_user/available",
  async function userExists(
    { field, value }: { field: "username" | "email"; value: string },
    { getState, dispatch }
  ) {
    var { availability } = (getState() as RootState)._user;
    var res = await fetchFromUser(`/available?${field}=${value}`, {
      method: "get",
    });

    dispatch(
      updateAvailabilityStatus({
        ...availability,
        [field]: res.data?.available ?? false,
      })
    );
  }
);

export var instructorSignupThunk = createAsyncThunk(
  "_user/instructor-signup",
  async function instructorSignup(_, { getState, dispatch }) {
    var { accessToken } = (getState() as RootState)._auth;
    var user = (getState() as RootState)._user.data;
    if (!accessToken || !user) return toast.error("You are not logged in");

    var res = await fetchFromUser("/instructor-signup", {
      method: "post",
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (res.status < 300) {
      toast.success("You are now an instructor!");
      dispatch(
        updateUserData({ ...user, roles: [...user.roles, "instructor"] })
      );
    } else {
      toast.error(res.msg);
    }
  }
);
