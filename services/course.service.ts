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

  console.log(response);
  if (response.statusCode == 201) {
    return { success: response.success, id: response.data._id };
  }
  return { success: false };
}
