import { AxiosRequestConfig } from "axios";

import fetchFromAPI from "../lib/axios.lib";

function fetchFromGroup(
  courseId: string,
  URL: string,
  config: AxiosRequestConfig
) {
  return fetchFromAPI(`/course/${courseId}/group/${URL}`, config);
}

export async function addGroup(courseId: string, accessToken: string) {
  var response = await fetchFromGroup(courseId, "", {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response.statusCode == 201) {
    return { success: response.success, group: response.data.group };
  }
  return { success: false };
}
