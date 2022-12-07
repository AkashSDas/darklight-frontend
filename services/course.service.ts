import { AxiosRequestConfig } from "axios";

import fetchFromAPI from "../lib/axios.lib";

function fetchFromCourse(URL: string, config: AxiosRequestConfig) {
  return fetchFromAPI(`/course/${URL}`, config);
}

export async function createCourse(accessToken: string) {
  var response = await fetchFromCourse("", {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response.statusCode == 201) {
    return { success: response.success, id: response.data._id };
  }
  return { success: false };
}

export async function getEditableCourse(id: string) {
  var response = await fetchFromCourse(`${id}/editable`, {
    method: "GET",
  });

  if (response.statusCode == 200) {
    return { success: response.success, course: response.data };
  }
  return { success: false, error: response.error };
}

export async function updateCourseSettings(
  accessToken: string,
  id: string,
  data: any
) {
  var response = await fetchFromCourse(`${id}/settings`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${accessToken}` },
    data,
  });

  if (response.statusCode == 200) {
    return { success: response.success };
  }
  return { success: false };
}

export async function updateCourseCover(
  accessToken: string,
  id: string,
  data: any
) {
  var response = await fetchFromCourse(`${id}/cover`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${accessToken}` },
    data,
  });

  if (response.statusCode == 200) {
    return { success: response.success };
  }
  return { success: false };
}
