import { Module } from "@store/editable-course/slice";
import fetchAPI from "services";

const baseURL = "/course";

// ====================
// SERVICES
// ====================

export async function createCourseService(token: string) {
  var response = await fetchAPI(`${baseURL}`, {
    method: "post",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status < 300) {
    return { success: true, msg: response.msg, course: response.data.course };
  } else {
    return { success: false, msg: response.msg, course: undefined };
  }
}

export async function getCourseService(courseId: string) {
  var response = await fetchAPI(`${baseURL}/${courseId}`, { method: "get" });
  console.log(response);

  if (response.status < 300) {
    return { success: true, msg: response.msg, course: response.data.course };
  } else {
    return { success: false, msg: response.msg, course: undefined };
  }
}

export interface UpdateCourseInfoPayload {
  token?: string;
  courseId: string;
  payload: {
    title?: string;
    description?: string;
    tags?: string[];
    stage?: "draft" | "published";
    price?: number;
    difficulty?: "beginner" | "intermediate" | "advanced";
  };
}

export async function updateCourseInfoService(data: UpdateCourseInfoPayload) {
  var { token, payload, courseId } = data;
  var response = await fetchAPI(`${baseURL}/${courseId}/info`, {
    method: "put",
    headers: { Authorization: `Bearer ${token}` },
    data: payload,
  });

  if (response.status < 300) {
    return { success: true, msg: response.msg, course: response.data.course };
  } else {
    return { success: false, msg: response.msg, course: undefined };
  }
}

export async function createCourseModuleService(payload: {
  token?: string;
  courseId: string;
}) {
  var response = await fetchAPI(`${baseURL}/${payload.courseId}`, {
    method: "post",
    headers: { Authorization: `Bearer ${payload.token}` },
  });

  if (response.status < 300) {
    return { success: true, msg: response.msg, module: response.data.module };
  } else {
    return { success: false, msg: response.msg, module: undefined };
  }
}

export async function getCourseModuleService(
  courseId: string,
  moduleId: string
) {
  var response = await fetchAPI(`${baseURL}/${courseId}/${moduleId}`, {
    method: "get",
  });

  if (response.status < 300) {
    return { success: true, msg: response.msg, module: response.data.module };
  } else {
    return { success: false, msg: response.msg, module: undefined };
  }
}

export async function updateCourseModuleService(
  courseId: string,
  moduleId: string,
  payload: Module,
  token: string
) {
  var response = await fetchAPI(`${baseURL}/${courseId}/${moduleId}`, {
    method: "put",
    data: payload,
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status < 300) {
    return { success: true, msg: response.msg, module: response.data.module };
  } else {
    return { success: false, msg: response.msg, module: undefined };
  }
}
