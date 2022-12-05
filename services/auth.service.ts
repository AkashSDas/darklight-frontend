import { AxiosRequestConfig } from "axios";

import { CompleteOAuthInput, ForgotPasswordInput, LoginInput, PasswordResetInput, SignupInput } from "../lib/auth.lib";
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

export async function passwordResetPassword(
  input: PasswordResetInput,
  token: string
) {
  var response = await fetchFromAuth(`password-reset/${token}`, {
    data: input,
    method: "PUT",
  });

  if (response.statusCode == 200) {
    return {
      success: response.success,
      message: response.data.message,
    };
  }

  return { success: false, error: response.error };
}

export async function completeOAuth(input: CompleteOAuthInput) {
  var response = await fetchFromAuth("complete-oauth", {
    data: input,
    method: "PUT",
  });
  if (response.statusCode == 200) {
    return { success: response.success, user: response.data.user };
  }

  return { success: false };
}

export async function cancelOAuth() {
  var response = await fetchFromAuth("cancel-oauth", {
    method: "DELETE",
  });
  if (response.statusCode == 200) {
    return { success: response.success };
  }

  return { success: false };
}
