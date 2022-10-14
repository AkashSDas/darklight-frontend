import fetchAPI from "services";

const baseURL = "/auth";

// ====================
// SERVICES
// ====================

export interface ISignupPayload {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export async function signupService(payload: ISignupPayload) {
  var response = await fetchAPI(`${baseURL}/signup`, {
    method: "post",
    data: payload,
  });
  if (response.status < 300 && response.data) {
    return {
      success: true,
      msg: "Your account is created. Please check your email to verify your account",
    };
  } else if (response.status >= 500 && response.data?.user) {
    return {
      success: true,
      msg: "Your account is created successfully",
    };
  } else {
    return {
      success: false,
      msg: response.msg || "Something went wrong, please try again",
    };
  }
}

export interface ICompleteOAuthSignupPayload {
  fullName: string;
  username: string;
  email: string;
}

export async function completeOAuthSignupService(
  payload: ICompleteOAuthSignupPayload
) {
  var response = await fetchAPI(`${baseURL}/complete-oauth`, {
    method: "post",
    data: payload,
  });

  if (response.status < 300) {
    return { success: true, msg: "Your account is successfully created" };
  }
  return {
    success: false,
    msg: response.msg || "Something went wrong, please try again",
  };
}

export interface ILoginPayload {
  email: string;
  password: string;
  confirmPassword: string;
}

export async function loginService(payload: ILoginPayload) {
  var response = await fetchAPI(`${baseURL}/login`, {
    method: "post",
    data: payload,
  });
  if (response.status < 300 && response.data) {
    return "You're logged in";
  } else {
    return response.msg || "Something went wrong, please try again";
  }
}

export async function cancelOAuthSignupService() {
  var response = await fetchAPI(`${baseURL}/cancel-oauth`, {
    method: "post",
  });
  if (response.status < 300) return true;
  return false;
}
