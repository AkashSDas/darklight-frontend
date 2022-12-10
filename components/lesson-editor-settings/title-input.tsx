import debounce from "lodash.debounce";
import { useCallback, useState } from "react";
import { updateLessonSettings } from "services/lesson.service";

import { useEditableCourse, useEditableGroup, useEditableLesson, useResizeTextareaHeight, useUser } from "../../lib/hooks.lib";
import { updateCourseSettings } from "../../services/course.service";
import { updateGroupSettings } from "../../services/group.service";

export default function GroupTitleInput() {
  var { accessToken } = useUser();
  var { lesson, mutateLesson } = useEditableLesson();
  var { courseId, group } = useEditableGroup();
  var { ref } = useResizeTextareaHeight(lesson?.title ?? "");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  var titleCallback = useCallback(
    debounce(async (value) => {
      if (value && courseId && group?._id && lesson._id && accessToken) {
        let update = { title: value, lastEditedOn: new Date(Date.now()) };
        let optimisticData = {
          success: true,
          error: null,
          lesson: { ...lesson, title: value },
        };

        await mutateLesson(async () => optimisticData, {
          optimisticData,
          revalidate: false,
        });

        let input = { emoji: lesson.emoji, free: lesson.free, ...update };
        await updateLessonSettings(
          courseId,
          group._id,
          lesson._id,
          input,
          accessToken
        );
      }
    }, 500),

    [courseId, group?._id]
  );

  return (
    <textarea
      ref={ref}
      onKeyDown={(e) => {
        if (e.key === "Enter") e.preventDefault();
      }}
      value={lesson?.title ?? ""}
      onChange={async (e) => {
        let update = {
          title: e.target.value,
          lastEditedOn: new Date(Date.now()),
        };
        let optimisticData = {
          success: true,
          error: null,
          lesson: { ...lesson, ...update },
        };

        await mutateLesson(async () => optimisticData, {
          optimisticData,
          revalidate: false,
        });
        await titleCallback(e.target.value);
      }}
      placeholder="Untitled"
      className="w-full leading-[100%] text-text1 placeholder:text-border text-[40px] font-gilroy font-extrabold outline-none resize-none"
    />
  );
}
