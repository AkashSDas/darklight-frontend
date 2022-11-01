import { AxiosRequestConfig } from "axios";
import fetchAPI from "services";

function fetchFromAuth(endpoint: string, opts: AxiosRequestConfig<any>) {
  const BASE_URL = "/auth";
  return fetchAPI(`${BASE_URL}/${endpoint}`, opts);
}

export interface SignupPayload {
  username: string;
  email: string;
  password: string;
}
export async function signupService(data: SignupPayload) {
  var res = await fetchFromAuth("signup", { method: "post", data });

  if ((res.status < 300 || res.status >= 500) && res.data) {
    return { success: true, msg: "Your account is created" };
  } else {
    return { success: false, msg: res.msg };
  }
}
