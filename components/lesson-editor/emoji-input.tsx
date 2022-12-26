import debounce from "lodash.debounce";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { updateGroupSettings } from "services/group.service";
import { updateLessonSettings } from "services/lesson.service";

import EmojiPicker from "@components/shared/emoji-picker";
import { useDropdown, useEditableCourse, useEditableGroup, useEditableLesson, useUser } from "@lib/hooks.lib";

export default function LessonEmojiInput(): JSX.Element {
  var { accessToken } = useUser();
  var { isOpen, setIsOpen, wrapperRef } = useDropdown();
  var { group, courseId, mutateCourse } = useEditableGroup();
  var { lesson, mutateLesson } = useEditableLesson();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  var emojiCallback = useCallback(
    debounce(async (value) => {
      // Makes request to the backend to update the emoji
      let update = { title: lesson.title, free: lesson.free, emoji: value };
      var { success } = await updateLessonSettings(
        courseId,
        group._id,
        lesson._id,
        update,
        accessToken
      );

      if (success) toast.success("Lesson emoji updated");
    }, 500),
    []
  );

  async function onEmojiSelect(emoji: any) {
    var update = { emoji: emoji.native };

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

    await emojiCallback(emoji.native);
  }

  return (
    <div
      ref={wrapperRef}
      onClick={() => setIsOpen(true)}
      className="relative cursor-pointer text-[60px] leading-[100%] w-fit h-fit flex justify-center items-center rounded-[3px] bg-background3 px-[3px] py-[1px]"
    >
      <span
        className="hover:brightness-90"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        {lesson?.emoji ?? "🌕"}
      </span>

      {isOpen && (
        <div className="absolute top-[60px]">
          <EmojiPicker
            onSelect={onEmojiSelect}
            handleClose={() => setIsOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
