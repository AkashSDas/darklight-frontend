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

export async function updateGroupSettings(
  courseId: string,
  groupId: string,
  input: { emoji?: string; title?: string; description?: string },
  accessToken: string
) {
  var response = await fetchFromGroup(courseId, `${groupId}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${accessToken}` },
    data: input,
  });

  if (response.statusCode == 200) {
    return { success: response.success, group: response.data };
  }
  return { success: false };
}
