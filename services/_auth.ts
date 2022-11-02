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

export interface CompleteOAuthPayload {
  username: string;
  email: string;
}
export async function completeOAuthService(data: CompleteOAuthPayload) {
  var res = await fetchFromAuth("complete-oauth", { method: "post", data });
  return { success: res.status < 300, msg: res.msg };
}

export async function cancelOAuthService() {
  var res = await fetchFromAuth("cancel-oauth", { method: "post" });
  return res.status < 300; // success?
}

export interface LoginPayload {
  email: string;
  password: string;
}
export async function loginService(data: LoginPayload) {
  var res = await fetchFromAuth("login", { method: "post", data });
  if (res.status < 300 && res.data) {
    let user = res.data.user;
    let accessToken = res.data.accessToken;
    return { success: true, msg: "Welcome back", accessToken, user };
  }
  return { success: false, msg: res.msg };
}

export async function getNewAccessTokenService() {
  var res = await fetchFromAuth("access-token", { method: "get" });
  if (res.status < 300 && res.data) {
    let accessToken = res.data.accessToken;
    let user = res.data.user;
    return { success: true, msg: res.msg, accessToken, user };
  }
  return { success: false, msg: res.msg };
}

export async function logoutService() {
  var res = await fetchFromAuth("logout", { method: "post" });
  return res.status < 300; // success?
}

export async function forgotPasswordService(data: { email: string }) {
  var res = await fetchFromAuth("forgot-password", { method: "post", data });
  return { success: res.status < 300, msg: res.msg };
}

export interface PasswordResetPayload {
  token: string;
  password: string;
  confirmPassword: string;
}
export async function passwordResetService(payload: PasswordResetPayload) {
  var res = await fetchFromAuth(`reset-password/${payload.token}`, {
    method: "post",
    data: {
      password: payload.password,
      confirmPassword: payload.confirmPassword,
    },
  });
  return { success: res.status < 300, msg: res.msg };
}

export async function verifyEmailService(data: { email: string }) {
  var res = await fetchFromAuth("verify-email", { method: "post", data });
  return { success: res.status < 300, msg: res.msg };
}
