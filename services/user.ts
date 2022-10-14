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
  var resposne = await fetchAPI(`${baseURL}/me`, { method: "get" });
  return resposne.data?.user || null;
}
