import { AxiosRequestConfig } from "axios";

import { ContentBlockType } from "@lib/content-block";
import { UpdateLessonSettings } from "@lib/course.lib";

import fetchFromAPI from "../lib/axios.lib";

function fetchFromContent(
  courseId: string,
  groupId: string,
  lessonId: string,
  URL: string,
  config: AxiosRequestConfig
) {
  return fetchFromAPI(
    `/course/${courseId}/group/${groupId}/lesson/${lessonId}/content/${URL}`,
    config
  );
}

export async function createContent(
  courseId: string,
  groupId: string,
  lessonId: string,
  blockType: ContentBlockType,
  accessToken: string
) {
  var response = await fetchFromContent(courseId, groupId, lessonId, "", {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
    data: { type: blockType },
  });

  if (response.statusCode == 201) {
    return {
      success: true,
      lesson: response.data.lesson,
      content: response.data.content,
    };
  }

  return { success: false, error: response.error };
}

export async function updateContent(
  courseId: string,
  groupId: string,
  lessonId: string,
  contentId: string,
  blockType: ContentBlockType,
  data: { key: string; value: string },
  accessToken: string
) {
  var response = await fetchFromContent(
    courseId,
    groupId,
    lessonId,
    `${contentId}`,
    {
      method: "PUT",
      headers: { Authorization: `Bearer ${accessToken}` },
      data: { type: blockType, data: data },
    }
  );

  console.log(response);
  if (response.statusCode == 200) {
    return {
      success: true,
      lesson: response.data.lesson,
      content: response.data.content,
    };
  }

  return { success: false, error: response.error };
}
