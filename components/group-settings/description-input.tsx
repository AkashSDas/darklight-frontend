import debounce from "lodash.debounce";
import { useCallback, useState } from "react";

import { useEditableCourse, useEditableGroup, useResizeTextareaHeight, useUser } from "../../lib/hooks.lib";
import { updateCourseSettings } from "../../services/course.service";
import { updateGroupSettings } from "../../services/group.service";

export default function GroupDescriptionInput() {
  var { course, courseId, mutateCourse } = useEditableCourse();
  var { group } = useEditableGroup();
  var { accessToken } = useUser();
  var { ref } = useResizeTextareaHeight(group?.description ?? "");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  var descriptionCallback = useCallback(
    debounce(async (value) => {
      if (value && courseId && group?._id && accessToken) {
        let update = { description: value, lastEditedOn: new Date(Date.now()) };
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
      value={group?.description ?? ""}
      onChange={async (e) => {
        let update = {
          description: e.target.value,
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

        await descriptionCallback(e.target.value);
      }}
      placeholder="Add a description"
      className="w-full placeholder:text-border text-[18px] outline-none resize-none"
    />
  );
}
