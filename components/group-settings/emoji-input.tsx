import debounce from "lodash.debounce";
import { useCallback } from "react";

import { useDropdown, useEditableCourse, useEditableGroup, useUser } from "../../lib/hooks.lib";
import { updateCourseSettings } from "../../services/course.service";
import { updateGroupSettings } from "../../services/group.service";
import EmojiPicker from "../shared/emoji-picker";

export default function GroupEmojiInput() {
  var { isOpen, setIsOpen, wrapperRef } = useDropdown();
  var { accessToken } = useUser();
  var { group } = useEditableGroup();
  var { course, mutateCourse } = useEditableCourse();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function onEmojiSelect(emoji: any) {
    let update = { emoji: emoji.native, lastEditedOn: new Date(Date.now()) };
    let optimisticData = {
      success: true,
      error: null,
      course: {
        ...course,
        groups: course.groups.map((g: any) =>
          g._id == group._id ? { ...g, ...update } : g
        ),
      },
    };

    await mutateCourse(async () => optimisticData, {
      optimisticData,
      revalidate: false,
    });

    let input = {
      ...course.groups.find((g: any) => g._id == group._id),
      ...update,
    };
    await updateGroupSettings(course._id, group?._id, input, accessToken);
  }

  return (
    <div
      onClick={() => setIsOpen(true)}
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
        {group?.emoji ?? "🌑"}
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
