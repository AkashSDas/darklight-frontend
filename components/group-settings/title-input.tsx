import debounce from "lodash.debounce";
import { useCallback, useState } from "react";

import { useEditableCourse, useEditableGroup, useResizeTextareaHeight, useUser } from "../../lib/hooks.lib";
import { updateCourseSettings } from "../../services/course.service";
import { updateGroupSettings } from "../../services/group.service";

export default function GroupTitleInput() {
  var { course, courseId, mutateCourse } = useEditableCourse();
  var { group } = useEditableGroup();
  var { accessToken } = useUser();
  var { ref } = useResizeTextareaHeight(group?.title ?? "");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  var titleCallback = useCallback(
    debounce(async (value) => {
      if (value && courseId && group?._id && accessToken) {
        let update = { title: value, lastEditedOn: new Date(Date.now()) };
        let optimisticData = {
          success: true,
          error: null,
          course: {
            ...course,
            groups: course.groups.map((g: any) =>
              g._id == group._id ? { ...g, ...update } : g
            ),
          },
        };

        await mutateCourse(async () => optimisticData, {
          optimisticData,
          revalidate: false,
        });

        let input = {
          ...course.groups.find((g: any) => g._id == group._id),
          ...update,
        };
        await updateGroupSettings(course._id, group?._id, input, accessToken);
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
      value={group?.title ?? ""}
      onChange={async (e) => {
        let update = {
          title: e.target.value,
          lastEditedOn: new Date(Date.now()),
        };
        let optimisticData = {
          success: true,
          error: null,
          course: {
            ...course,
            groups: course.groups.map((g: any) =>
              g._id == group._id ? { ...g, ...update } : g
            ),
          },
        };

        await mutateCourse(async () => optimisticData, {
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
