import fetchAPI from "services";

const baseURL = "/user";

// ====================
// SERVICES
// ====================

export async function checkUserAvailabilityService(
  field: "username" | "email",
  value: string
) {
  var response = await fetchAPI(`${baseURL}/check/${field}/${value}`, {
    method: "get",
  });
  if (response.data) return response.data.available;
  else return false;
}

export async function getLoggedInUserService() {
  var response = await fetchAPI(`${baseURL}/me`, { method: "get" });
  return response.data?.user || null;
}

export async function instructorSignupService(token?: string) {
  var response = await fetchAPI(`${baseURL}/instructor-signup`, {
    method: "post",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status < 300) return true;
  else return false;
}
