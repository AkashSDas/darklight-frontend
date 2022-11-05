import { AxiosRequestConfig } from "axios";
import fetchAPI from "services";

import { Module } from "@store/_course/slice";

function fetchFromCourse(endpoint: string, opts: AxiosRequestConfig) {
  const BASE_URL = "/course";
  return fetchAPI(`${BASE_URL}/${endpoint}`, opts);
}

export async function getCourseService(courseId: string) {
  var res = await fetchFromCourse(courseId, { method: "get" });
  return res.data;
}

export async function createCourseService(token: string) {
  var res = await fetchFromCourse("", {
    method: "post",
    headers: { Authorization: `Bearer ${token}` },
  });

  return { success: res.status < 300, msg: res.msg, course: res.data };
}

export interface CourseInfoPayload {
  emoji?: string;
  title?: string;
  description?: string;
  tags?: string[];
  stage?: "draft" | "published";
  price?: number;
  difficulty?: "beginner" | "intermediate" | "advanced";
}
export async function updateCourseInfoService(
  token: string,
  courseId: string,
  data: CourseInfoPayload
) {
  var res = await fetchFromCourse(`${courseId}/info`, {
    method: "put",
    headers: { Authorization: `Bearer ${token}` },
    data,
  });

  return { success: res.status < 300, msg: res.msg, course: res.data?.course };
}

export async function getModuleService(courseId: string, moduleId: string) {
  var res = await fetchFromCourse(`${courseId}/${moduleId}`, { method: "get" });
  return res.data;
}

export async function createModuleService(token: string, courseId: string) {
  var res = await fetchFromCourse(courseId, {
    method: "post",
    headers: { Authorization: `Bearer ${token}` },
  });

  return { success: res.status < 300, msg: res.msg, module: res.data };
}

export interface ModuleInfoPayload {
  emoji?: string;
  title?: string;
  description?: string;
  lessons?: string[];
}
export async function updateModuleService(
  token: string,
  courseId: string,
  moduleId: string,
  data: ModuleInfoPayload
) {
  var res = await fetchFromCourse(`${courseId}/${moduleId}`, {
    method: "put",
    headers: { Authorization: `Bearer ${token}` },
    data,
  });
  return { success: res.status < 300, msg: res.msg, module: res.data };
}

export async function reorderModules(
  token: string,
  courseId: string,
  data: Module[]
) {
  var res = await fetchFromCourse(`${courseId}/reorder`, {
    method: "put",
    headers: { Authorization: `Bearer ${token}` },
    data,
  });
  return { success: res.status < 300, msg: res.msg, course: res.data };
}

export async function createLessonService(
  token: string,
  courseId: string,
  moduleId: string
) {
  var res = await fetchFromCourse(`${courseId}/${moduleId}`, {
    method: "post",
    headers: { Authorization: `Bearer ${token}` },
  });

  return { success: res.status < 300, msg: res.msg, lesson: res.data };
}

export async function getLessonService(
  courseId: string,
  moduleId: string,
  lessonId: string
) {
  var res = await fetchFromCourse(`${courseId}/${moduleId}/${lessonId}`, {
    method: "get",
  });
  return res.data;
}
