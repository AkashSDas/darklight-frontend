import { AxiosRequestConfig } from "axios";
import fetchAPI from "services";

function fetchFromUser(endpoint: string, opts: AxiosRequestConfig) {
  const BASE_URL = "/user";
  return fetchAPI(`${BASE_URL}/${endpoint}`, opts);
}

export interface UserExistsPayload {
  field: "username" | "email";
  value: string;
}
export async function userExistsService(payload: UserExistsPayload) {
  var res = await fetchFromUser(`available?${payload.field}=${payload.value}`, {
    method: "get",
  });

  if (res.data) return res.data.available;
  else return false;
}

export async function instructorSignupService(token: string) {
  var res = await fetchFromUser("instructor-signup", {
    method: "post",
    headers: { Authorization: `Bearer ${token}` },
  });

  return { success: res.status < 300, msg: res.msg };
}
