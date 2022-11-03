import { AxiosRequestConfig } from "axios";
import fetchAPI from "services";

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
