import debounce from "lodash.debounce";
import { ChangeEvent, useCallback } from "react";
import { updateGroupSettings } from "services/group.service";
import { updateLessonSettings } from "services/lesson.service";

import { useEditableCourse, useEditableGroup, useEditableLesson, useResizeTextareaHeight, useUser } from "@lib/hooks.lib";

export default function LessonTitleInput(): JSX.Element {
  var { accessToken } = useUser();
  var { group, courseId, mutateCourse } = useEditableGroup();
  var { lesson, mutateLesson } = useEditableLesson();
  var { ref } = useResizeTextareaHeight(lesson.title ?? "");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  var titleCallback = useCallback(
    debounce(async (value: string) => {
      if (value && accessToken && group) {
        let update = { title: value, free: lesson.free, emoji: lesson.emoji };
        var { success } = await updateLessonSettings(
          courseId,
          group._id,
          lesson._id,
          update,
          accessToken
        );
      }
    }, 500),

    [courseId, group._id]
  );

  async function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    var update = { title: e.target.value };

    mutateCourse(
      (data) =>
        ({
          ...data,
          course: {
            ...data?.course,
            groups: data?.course.groups.map((g: any) =>
              g._id != group._id
                ? g
                : {
                    ...g,
                    lessons: g.lessons.map((l: any) =>
                      l._id != lesson._id ? l : { ...l, ...update }
                    ),
                  }
            ),
          },
        } as any),
      false
    );

    mutateLesson(
      (data) => ({ ...data, lesson: { ...data?.lesson, ...update } } as any),
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
      value={lesson.title}
      onChange={handleChange}
      placeholder="Untitled"
      className="w-full leading-[100%] text-text1 placeholder:text-border text-[40px] font-gilroy font-extrabold outline-none resize-none"
    />
  );
}
