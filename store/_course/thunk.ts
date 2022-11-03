import toast from "react-hot-toast";
import { CourseInfoPayload, createCourseService, getCourseService, updateCourseInfoService } from "services/_course";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "../";
import { updateCourse } from "./slice";

export var getCourseThunk = createAsyncThunk(
  "_course/get",
  async function getCourse(courseId: string, { getState, dispatch }) {
    var course = await getCourseService(courseId);
    dispatch(updateCourse(course as any));
    return course?.id;
  }
);

export var createCourseThunk = createAsyncThunk(
  "_course/create",
  async function createCourse(_, { getState, dispatch }) {
    var { accessToken } = (getState() as RootState)._auth;
    if (accessToken) {
      var res = await createCourseService(accessToken);
      if (res.success && res.course) {
        dispatch(updateCourse(res.course as any));
        toast.success("Course created");
        return res.course.id;
      } else toast.error(res.msg);
    } else toast.error("You are not logged in");
    return null;
  }
);

export var updateCourseInfoThunk = createAsyncThunk(
  "_course/update-info",
  async function updateCourseInfo(
    { courseId, payload }: { courseId: string; payload: CourseInfoPayload },
    { getState, dispatch }
  ) {
    var { accessToken } = (getState() as RootState)._auth;
    if (accessToken) {
      var res = await updateCourseInfoService(accessToken, courseId, payload);
      if (res.success && res.course) {
        dispatch(updateCourse(res.course as any));
      } else toast.error(res.msg);
    } else toast.error("You are not logged in");
  }
);
