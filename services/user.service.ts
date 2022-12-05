import { AxiosRequestConfig } from "axios";

import fetchFromAPI from "../lib/axios.lib";

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
