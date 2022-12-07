import debounce from "lodash.debounce";
import { useCallback, useState } from "react";

import { useEditableCourse, useResizeTextareaHeight, useUser } from "../../lib/hooks.lib";
import { updateCourseSettings } from "../../services/course.service";

export default function TitleInput() {
  var { course, courseId, mutateCourse } = useEditableCourse();
  var { accessToken } = useUser();
  var [title, setTitle] = useState(course?.title ?? "");
  var { ref } = useResizeTextareaHeight(title);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  var titleCallback = useCallback(
    debounce(async (value) => {
      if (value && courseId) {
        let update = {
          title: value,
          lastEditedOn: new Date(Date.now()),
        };
        await updateCourseSettings(accessToken, courseId, update);
      }
    }, 500),

    [courseId]
  );

  return (
    <textarea
      ref={ref}
      onKeyDown={(e) => {
        if (e.key === "Enter") e.preventDefault();
      }}
      value={title}
      onChange={async (e) => {
        setTitle(e.target.value);
        let update = {
          title: e.target.value,
          lastEditedOn: new Date(Date.now()),
        };
        let optimisticData = {
          success: true,
          course: { ...course, ...update },
          error: null,
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
