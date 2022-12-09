import { updateLessonSettings } from "services/lesson.service";

import EmojiPicker from "@components/emoji/picker";
import { useDropdown, useEditableGroup, useEditableLesson, useUser } from "@lib/hooks.lib";

export default function LessonEmojiInput() {
  var { isOpen, setIsOpen, wrapperRef } = useDropdown();
  var { lesson, mutateLesson } = useEditableLesson();
  var { group, courseId } = useEditableGroup();
  var { accessToken } = useUser();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function onEmojiSelect(emoji: any) {
    let update = { emoji: emoji.native, lastEditedOn: new Date(Date.now()) };
    let optimisticData = {
      success: true,
      error: null,
      lesson: { ...lesson, ...update },
    };

    await mutateLesson(async () => optimisticData, {
      optimisticData,
      revalidate: false,
    });

    let input = { title: lesson.title, free: lesson.free, ...update };
    await updateLessonSettings(
      courseId,
      group._id,
      lesson._id,
      input,
      accessToken
    );
  }

  return (
    <div
      ref={wrapperRef}
      className="relative cursor-pointer text-[60px] leading-[100%] w-fit h-fit flex justify-center items-center rounded-[3px] bg-background3 px-[3px] py-[1px]"
    >
      <span
        className="hover:brightness-90"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        {lesson?.emoji ?? "🌑"}
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
