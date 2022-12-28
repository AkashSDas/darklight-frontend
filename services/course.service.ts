import { AxiosRequestConfig } from "axios";

import fetchFromAPI from "../lib/axios.lib";

function fetchFromCourse(URL: string, config: AxiosRequestConfig) {
  return fetchFromAPI(`/course/${URL}`, config);
}

export async function createCourse(accessToken: string) {
  var response = await fetchFromCourse("", {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response.statusCode == 201) {
    return { success: response.success, id: response.data._id };
  }
  return { success: false };
}

export async function getEditableCourse(id: string) {
  var response = await fetchFromCourse(`${id}/editable`, {
    method: "GET",
  });

  if (response.statusCode == 200) {
    return { success: response.success, course: response.data };
  }
  return { success: false, error: response.error, course: null };
}

export async function updateCourseSettings(
  accessToken: string,
  id: string,
  data: {
    emoji?: string;
    title?: string;
    description?: string;
    stage?: "published" | "draft";
    price?: number;
    difficulty?: "beginner" | "intermediate" | "advanced";
    tags?: string[];
    faqs?: { question: string; answer: string }[];
  }
) {
  var response = await fetchFromCourse(`${id}/settings`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${accessToken}` },
    data,
  });

  if (response.statusCode == 200) {
    return { success: response.success };
  }
  return { success: false };
}

export async function updateCourseCover(
  accessToken: string,
  id: string,
  data: any
) {
  var response = await fetchFromCourse(`${id}/cover`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${accessToken}` },
    data,
  });

  if (response.statusCode == 200) {
    return { success: response.success, URL: response.data.URL };
  }
  return { success: false };
}

export async function reorderGroups(
  accessToken: string,
  id: string,
  data: any
) {
  var response = await fetchFromCourse(`${id}/reorder`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${accessToken}` },
    data,
  });

  if (response.statusCode == 200) {
    return { success: response.success };
  }
  return { success: false };
}

export async function updateCourseStatus(
  id: string,
  accessToken: string,
  stage: "draft" | "published"
) {
  var response = await fetchFromCourse(`${id}/status`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${accessToken}` },
    data: { stage },
  });

  if (response.statusCode == 200) {
    return { success: response.success };
  }
  return { success: false };
}

export async function getCourse(id: string) {
  var response = await fetchFromCourse(`${id}`, { method: "GET" });

  if (response.statusCode == 200) {
    return { success: response.success, course: response.data };
  }
  return { success: false, error: response.error };
}

export async function getAuthoredCourses(userId: string, accessToken?: string) {
  var response = await fetchFromCourse(`${userId}/authored-courses`, {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response.statusCode == 200) {
    return {
      success: response.success,
      courses: response.data.courses,
      hasNext: response.data.hasNext,
      hasPrevious: response.data.hasPrevious,
      next: response.data.next,
    };
  }
  return { success: false, error: response.error };
}

export async function deleteCourse(courseId: string, accessToken: string) {
  var response = await fetchFromCourse(`${courseId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response.statusCode == 200) {
    return { success: response.success };
  }
  return { success: false };
}

export async function getCourses() {
  var response = await fetchFromCourse("", { method: "GET" });

  if (response.statusCode == 200) {
    return {
      success: response.success,
      courses: response.data.courses,
      hasNext: response.data.hasNext,
      hasPrevious: response.data.hasPrevious,
      next: response.data.next,
    };
  }
  return { success: false, error: response.error };
}
