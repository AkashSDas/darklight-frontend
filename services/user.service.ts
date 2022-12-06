import { AxiosRequestConfig } from "axios";

import fetchFromAPI from "../lib/axios.lib";
import { UpdateDetailsInput } from "../lib/user.lib";

function fetchFromUser(URL: string, config: AxiosRequestConfig) {
  return fetchFromAPI(`/user/${URL}`, config);
}

export async function me(accessToken: string) {
  var response = await fetchFromUser("me", {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (response.statusCode == 200) {
    return {
      success: response.success,
      user: response.data.user,
    };
  }

  return { success: false };
}

export async function updateProfileImage(accessToken: string, data: FormData) {
  var response = await fetchFromUser("profile-image", {
    method: "PUT",
    headers: { Authorization: `Bearer ${accessToken}` },
    data,
  });
  if (response.statusCode == 200) return { success: response.success };
  return { success: false };
}

export async function instructorSignup(accessToken: string) {
  var response = await fetchFromUser("instructor-signup", {
    method: "PUT",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (response.statusCode == 200) return { success: response.success };
  return { success: false };
}
