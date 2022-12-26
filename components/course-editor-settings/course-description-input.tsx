import debounce from "lodash.debounce";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { updateCourseSettings } from "services/course.service";
import useSWR from "swr";

import { useEditableCourse, useResizeTextareaHeight, useUser } from "@lib/hooks.lib";

export default function CourseDescriptionInput(): JSX.Element {
  var { accessToken } = useUser();
  var { course, mutateCourse } = useEditableCourse();
  var { ref } = useResizeTextareaHeight(course.description ?? "");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  var descriptionCallback = useCallback(
    debounce(async (value) => {
      if (value && course && accessToken) {
        let update = { description: value };
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
          course: { ...data?.course, description: e.target.value },
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
      value={course.description}
      onChange={handleChange}
      placeholder="Add a description"
      className="w-full placeholder:text-border text-[18px] outline-none resize-none"
    />
  );
}
