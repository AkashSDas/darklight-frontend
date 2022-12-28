import { AxiosRequestConfig } from "axios";

import fetchFromAPI from "../lib/axios.lib";

function fetchFromEnrolledCourse(URL: string, config: AxiosRequestConfig) {
  return fetchFromAPI(`/enrolled${URL}`, config);
}

export async function buyCourse(courseId: string, accessToken?: string) {
  var response = await fetchFromEnrolledCourse(`/buy/${courseId}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  console.log(response);
  if (response.statusCode == 200 && response.data) {
    return {
      success: response.success,
      enrolledCourse: response.data?.enrolledCourse,
    };
  }

  return { success: false };
}

export async function getEnrolledCourse(
  courseId: string,
  accessToken?: string
) {
  var response = await fetchFromEnrolledCourse(`/${courseId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response.statusCode == 200 && response.data) {
    return { success: response.success, course: response.data?.course };
  }

  return { success: false };
}
