import toast from "react-hot-toast";
import { createCourseService, getCourseService } from "services/course";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "../";
import { setCourse } from "./slice";

export var createCourseThunk = createAsyncThunk(
  "editable-course/create",
  async function (_, { getState, dispatch }) {
    var token = (getState() as RootState).auth.accessToken;
    var response = await createCourseService(token);
    if (response.success && response.course) {
      dispatch(setCourse(response.course));
      return response.course.id;
    } else toast.error(response.msg || "Failed to create course");
    return null;
  }
);

export var getCourseThunk = createAsyncThunk(
  "editable-course/get",
  async function (courseId: string, { dispatch }) {
    var response = await getCourseService(courseId);
    console.log(response);
    if (response.success && response.course) {
      dispatch(setCourse(response.course));
      return response.course.id;
    } else toast.error(response.msg || "Failed to fetch the course");
    return null;
  }
);
