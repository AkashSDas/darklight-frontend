import { AxiosRequestConfig } from "axios";

import { ForgotPasswordInput, LoginInput, SignupInput } from "../lib/auth.lib";
import fetchFromAPI from "../lib/axios.lib";

function fetchFromAuth(URL: string, config: AxiosRequestConfig) {
  return fetchFromAPI(`/auth/${URL}`, config);
}

export async function signup(input: SignupInput) {
  var response = await fetchFromAuth("signup", { data: input, method: "POST" });
  if (response.statusCode == 201) {
    return {
      success: response.success,
      message: response.data.message,
      user: response.data.user,
      accessToken: response.data.accessToken,
    };
  }

  return { success: false };
}

export async function getNewAccessToken() {
  var response = await fetchFromAuth("access-token", { method: "GET" });
  if (response.statusCode == 200) {
    return {
      success: response.success,
      user: response.data.user,
      accessToken: response.data.accessToken,
    };
  }

  return { success: false };
}

export async function login(input: LoginInput) {
  var response = await fetchFromAuth("login", { data: input, method: "POST" });
  if (response.statusCode == 200) {
    return {
      success: response.success,
      message: response.data.message,
      user: response.data.user,
      accessToken: response.data.accessToken,
    };
  }

  return { success: false };
}

export async function logout() {
  await fetchFromAuth("logout", { method: "GET" });
}

export async function forgotPassword(input: ForgotPasswordInput) {
  var response = await fetchFromAuth("forgot-password", {
    data: input,
    method: "POST",
  });

  if (response.statusCode == 200) {
    return {
      success: response.success,
      message: response.data.message,
    };
  }

  return { success: false, error: response.error };
}
