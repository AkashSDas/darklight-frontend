import fetchAPI from "services";

const baseURL = "/user";

// ====================
// SERVICES
// ====================

export async function checkUserAvailabilityService(
  field: string,
  value: string
) {
  var response = await fetchAPI(`${baseURL}/check/${field}/${value}`, {
    method: "get",
  });
  if (response.data) return response.data.available;
  else return false;
}
