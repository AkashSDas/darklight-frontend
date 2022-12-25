import debounce from "lodash.debounce";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { updateCourseSettings } from "services/course.service";
import useSWR from "swr";

import { useEditableCourse, useResizeTextareaHeight, useUser } from "@lib/hooks.lib";

export default function TitleInput(): JSX.Element {
  var { accessToken } = useUser();
  var { course, mutateCourse } = useEditableCourse();
  var { ref } = useResizeTextareaHeight(course.title ?? "");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  var titleCallback = useCallback(
    debounce(async (value) => {
      if (value && course && accessToken) {
        let update = { title: value };
        await updateCourseSettings(accessToken, course._id, update);
      }
    }, 500),

    [course._id]
  );

  async function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    mutateCourse(
      (data) =>
        ({
          ...data,
          course: { ...data?.course, title: e.target.value },
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
      value={course.title}
      onChange={handleChange}
      placeholder="Untitled"
      className="w-full leading-[100%] text-text1 placeholder:text-border text-[40px] font-gilroy font-extrabold outline-none resize-none"
    />
  );
}
