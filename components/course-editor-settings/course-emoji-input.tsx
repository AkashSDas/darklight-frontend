import debounce from "lodash.debounce";
import { useCallback } from "react";
import { updateCourseSettings } from "services/course.service";
import { useSWRConfig } from "swr";

import EmojiPicker from "@components/shared/emoji-picker";
import { useDropdown, useEditableCourse, useUser } from "@lib/hooks.lib";

export default function CourseEmojiInput(): JSX.Element {
  var { accessToken } = useUser();
  var { isOpen, setIsOpen, wrapperRef } = useDropdown();
  var { course, mutateCourse, courseId } = useEditableCourse();
  var { mutate } = useSWRConfig();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  var emojiCallback = useCallback(
    debounce(async (value) => {
      // Makes request to the backend to update the emoji
      let update = { emoji: value, lastEditedOn: new Date(Date.now()) };
      await updateCourseSettings(accessToken, courseId, update);
      return { success: true, error: null, course: { ...course, ...update } };
    }, 500),
    [courseId]
  );

  async function onEmojiSelect(emoji: any) {
    var update = {
      emoji: emoji.native,
      // lastEditedOn: new Date(Date.now()).toISOString(),
    };
    var optimisticData = {
      success: true,
      error: null,
      course: { ...course, ...update },
    };

    await mutateCourse(async () => optimisticData, {
      optimisticData,
      revalidate: false,
    });

    await emojiCallback(emoji.native);
  }

  return (
    <div
      ref={wrapperRef}
      onClick={() => setIsOpen(true)}
      className="absolute -bottom-4 left-4 px-[3px] py-[1px] w-fit h-fit flex justify-center items-center rounded-[3px] bg-background3 cursor-pointer text-[60px] leading-[100%] "
    >
      <span
        className="hover:brightness-90"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        {course?.emoji ?? "🌕"}
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
