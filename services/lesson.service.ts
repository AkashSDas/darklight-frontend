import { AxiosRequestConfig } from "axios";

import fetchFromAPI from "../lib/axios.lib";

function fetchFromLesson(
  courseId: string,
  groupId: string,
  URL: string,
  config: AxiosRequestConfig
) {
  return fetchFromAPI(
    `/course/${courseId}/group/${groupId}/lesson/${URL}`,
    config
  );
}

export async function addLesson(
  courseId: string,
  groupId: string,
  accessToken: string
) {
  var response = await fetchFromLesson(courseId, groupId, "", {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response.statusCode == 201) {
    return { success: response.success, lesson: response.data };
  }
  return { success: false };
}

export async function getLesson(
  courseId: string,
  groupId: string,
  lessonId: string,
  accessToken: string
) {
  var response = await fetchFromLesson(courseId, groupId, `${lessonId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response.statusCode == 200) {
    return { success: response.success, lesson: response.data.lesson };
  }
  return { success: false };
}
