import debounce from "lodash.debounce";
import { useCallback, useState } from "react";

import { useEditableCourse, useResizeTextareaHeight, useUser } from "../../lib/hooks.lib";
import { updateCourseSettings } from "../../services/course.service";

export default function DescriptionInput() {
  var { course, courseId, mutateCourse } = useEditableCourse();
  var { accessToken } = useUser();
  var [description, setDescription] = useState(course?.description ?? "");
  var { ref } = useResizeTextareaHeight(description);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  var descriptionCallback = useCallback(
    debounce(async (value) => {
      if (value && courseId && accessToken) {
        let update = {
          description: value,
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
      value={description}
      onChange={async (e) => {
        setDescription(e.target.value);
        let update = {
          description: e.target.value,
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

        await descriptionCallback(e.target.value);
      }}
      placeholder="Add a description"
      className="w-full placeholder:text-border text-[18px] outline-none resize-none"
    />
  );
}
