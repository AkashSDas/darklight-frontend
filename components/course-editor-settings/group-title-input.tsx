import debounce from "lodash.debounce";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { updateCourseSettings } from "services/course.service";
import { updateGroupSettings } from "services/group.service";
import useSWR from "swr";

import { useEditableCourse, useEditableGroup, useResizeTextareaHeight, useUser } from "@lib/hooks.lib";

export default function GroupTitleInput(): JSX.Element {
  var { accessToken } = useUser();
  var { course, mutateCourse } = useEditableCourse();
  var { group } = useEditableGroup();
  var { ref } = useResizeTextareaHeight(group.title ?? "");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  var titleCallback = useCallback(
    debounce(async (value) => {
      if (value && course && accessToken && group) {
        let update = { title: value };
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
              g._id == group._id ? { ...g, title: e.target.value } : g
            ),
          },
        } as any),
      false
    );

    await titleCallback(e.target.value);
  }

  return (
    <textarea
      ref={ref}
      onKeyDown={(e) => {
        if (e.key == "Enter") e.preventDefault();
      }}
      value={group.title}
      onChange={handleChange}
      placeholder="Untitled"
      className="w-full leading-[100%] text-text1 placeholder:text-border text-[40px] font-gilroy font-extrabold outline-none resize-none"
    />
  );
}
