import debounce from "lodash.debounce";
import { useCallback } from "react";

import { useDropdown, useEditableCourse, useUser } from "../../lib/hooks.lib";
import { updateCourseSettings } from "../../services/course.service";
import EmojiPicker from "../emoji/picker";

export default function CourseEmojiInput() {
  var { isOpen, setIsOpen, wrapperRef } = useDropdown();
  var { accessToken } = useUser();
  var { course, mutateCourse, courseId } = useEditableCourse();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  var emojiCallback = useCallback(
    debounce(async (value) => {
      if (value && courseId && accessToken) {
        let update = {
          emoji: value,
          lastEditedOn: new Date(Date.now()),
        };
        await updateCourseSettings(accessToken, courseId, update);
      }
    }, 500),

    [courseId]
  );

  async function onEmojiSelect(emoji: any) {
    let update = { emoji: emoji.native, lastEditedOn: new Date(Date.now()) };
    let optimisticData = {
      success: true,
      course: { ...course, ...update },
      error: null,
    };

    await mutateCourse(async () => optimisticData, {
      optimisticData,
      revalidate: false,
    });

    await emojiCallback(emoji.native);
  }

  return (
    <div
      onClick={() => setIsOpen(true)}
      ref={wrapperRef}
      className="absolute -bottom-4 left-4 cursor-pointer text-[60px] leading-[100%] w-fit h-fit flex justify-center items-center rounded-[3px] bg-background3 px-[3px] py-[1px]"
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
