import debounce from "lodash.debounce";
import { useCallback } from "react";
import { updateGroupSettings } from "services/group.service";

import EmojiPicker from "@components/shared/emoji-picker";
import { useDropdown, useEditableCourse, useEditableGroup, useUser } from "@lib/hooks.lib";

export default function GroupEmojiInput(): JSX.Element {
  var { accessToken } = useUser();
  var { isOpen, setIsOpen, wrapperRef } = useDropdown();
  var { course, mutateCourse } = useEditableCourse();
  var { group } = useEditableGroup();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  var emojiCallback = useCallback(
    debounce(async (value) => {
      // Makes request to the backend to update the emoji
      let update = { emoji: value };
      await updateGroupSettings(course._id, group?._id, update, accessToken);
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
              g._id == group._id ? { ...g, ...update } : g
            ),
          },
        } as any),
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
        {group?.emoji ?? "🌕"}
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
