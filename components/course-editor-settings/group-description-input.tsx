import debounce from "lodash.debounce";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { updateCourseSettings } from "services/course.service";
import { updateGroupSettings } from "services/group.service";
import useSWR from "swr";

import { useEditableCourse, useEditableGroup, useResizeTextareaHeight, useUser } from "@lib/hooks.lib";

export default function GroupDescriptionInput(): JSX.Element {
  var { accessToken } = useUser();
  var { course, mutateCourse } = useEditableCourse();
  var { group } = useEditableGroup();
  var { ref } = useResizeTextareaHeight(group.description ?? "");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  var descriptionCallback = useCallback(
    debounce(async (value) => {
      if (value && course && accessToken && group) {
        let update = { description: value };
        await updateGroupSettings(course._id, group?._id, update, accessToken);
      }
    }, 500),

    [course._id, group._id]
  );

  async function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    mutateCourse(
      (data) =>
        ({
          ...data,
          course: {
            ...data?.course,
            groups: data?.course.groups.map((g: any) =>
              g._id == group._id ? { ...g, description: e.target.value } : g
            ),
          },
        } as any),
      false
    );

    await descriptionCallback(e.target.value);
  }

  return (
    <textarea
      ref={ref}
      onKeyDown={(e) => {
        if (e.key == "Enter") e.preventDefault();
      }}
      value={group.description}
      onChange={handleChange}
      placeholder="Add a description"
      className="w-full placeholder:text-border text-[18px] outline-none resize-none"
    />
  );
}
