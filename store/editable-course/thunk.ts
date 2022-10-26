import toast from "react-hot-toast";
import { createCourseModuleService, createCourseService, createLessonService, getCourseModuleService, getCourseService, reorderModulesService, UpdateCourseInfoPayload, updateCourseInfoService, updateCourseModuleService } from "services/course";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "../";
import { addModule, Module, setCourse, setLesson, setModule } from "./slice";

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
    if (response.success && response.course) {
      dispatch(setCourse(response.course));
      return response.course.id;
    } else toast.error(response.msg || "Failed to fetch the course");
    return null;
  }
);

export var updateCourseInfoThunk = createAsyncThunk(
  "editable-course/update-info",
  async function (
    data: { courseId: string; payload: UpdateCourseInfoPayload["payload"] },
    { getState, dispatch }
  ) {
    var token = (getState() as RootState).auth.accessToken;
    var response = await updateCourseInfoService({
      token,
      courseId: data.courseId,
      payload: data.payload,
    });
    console.log(response);
    if (response.success && response.course) {
      dispatch(setCourse(response.course));
      return response.course.id;
    } else toast.error(response.msg || "Failed to update course info");
    return null;
  }
);

export var createCourseModuleThunk = createAsyncThunk(
  "editable-course/create-module",
  async function (courseId: string, { getState, dispatch }) {
    var token = (getState() as RootState).auth.accessToken;
    var response = await createCourseModuleService({ token, courseId });
    if (response.success && response.module) {
      dispatch(addModule(response.module));
      return response.module.id;
    } else toast.error(response.msg || "Failed to create module");
    return null;
  }
);

export var getCourseModuleThunk = createAsyncThunk(
  "editable-course/get-active-module",
  async function (
    { courseId, moduleId }: { courseId: string; moduleId: string },
    { dispatch }
  ) {
    var response = await getCourseModuleService(courseId, moduleId);
    if (response.success && response.module) {
      dispatch(setModule({ module: response.module, editing: false }));
      return response.module.id;
    } else toast.error(response.msg || "Failed to fetch the module");
    return null;
  }
);

export var updateCourseModuleThunk = createAsyncThunk(
  "editable-course/update-active-module",
  async function (
    {
      courseId,
      moduleId,
      payload,
    }: { courseId: string; moduleId: string; payload: Module },
    { dispatch, getState }
  ) {
    var token = (getState() as RootState).auth.accessToken;
    var response = await updateCourseModuleService(
      courseId,
      moduleId,
      payload,
      token
    );
    if (response.success && response.module) {
      dispatch(setModule({ module: response.module, editing: false }));
      return response.module.id;
    } else toast.error(response.msg || "Failed to update the module");
    return null;
  }
);

export var reorderModulesThunk = createAsyncThunk(
  "editable-course/reorder-modules",
  async function (
    data: { courseId: string; payload: Module[] },
    { getState, dispatch }
  ) {
    var token = (getState() as RootState).auth.accessToken;
    var course = (getState() as RootState).editableCourse.course;
    var response = await reorderModulesService(
      data.courseId,
      data.payload,
      token
    );
    console.log(response);
    if (response.success && response.modules) {
      dispatch(setCourse({ ...course, modules: response.modules }));
    } else toast.error(response.msg || "Failed to update modules order info");
    return null;
  }
);

export var createLessonThunk = createAsyncThunk(
  "editable-course/create-lesson",
  async function (
    { courseId, moduleId }: { courseId: string; moduleId: string },
    { getState, dispatch }
  ) {
    var token = (getState() as RootState).auth.accessToken;
    var response = await createLessonService(token, courseId, moduleId);
    if (response.success && response.lesson) {
      dispatch(
        setLesson({ lesson: response.lesson, moduleId, editing: false })
      );
      return response.lesson.id;
    } else toast.error(response.msg || "Failed to create lesson");
    return null;
  }
);
