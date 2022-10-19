import fetchAPI from "services";

const baseURL = "/course";

// ====================
// SERVICES
// ====================

export async function createCourseService(token: string) {
  var response = await fetchAPI(`${baseURL}`, {
    method: "post",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status < 300) {
    return { success: true, course: response.data.course };
  } else {
    return { success: false, course: undefined };
  }
}
