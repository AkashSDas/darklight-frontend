import debounce from "lodash.debounce";
import { ChangeEvent, useCallback } from "react";
import { updateContent } from "services/lesson-content.service";

import { ContentBlockType, getBlock, getBlockDataValue } from "@lib/content-block";
import { useEditableGroup, useEditableLesson, useUser } from "@lib/hooks.lib";

export default function ParagraphBlock({ id }: { id: string }): JSX.Element {
  var { accessToken } = useUser();
  var { courseId, group } = useEditableGroup();
  var { lesson, mutateLesson } = useEditableLesson();

  var block = getBlock(lesson, id);
  var textValue = getBlockDataValue(block, "text");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  var paragraphCallback = useCallback(
    debounce(async (input) => {
      if (input && courseId && group?._id && lesson._id && accessToken) {
        await updateContent(
          courseId,
          group._id,
          lesson._id,
          id,
          input,
          accessToken
        );
      }
    }, 500),

    [courseId, group?._id, lesson?._id]
  );

  async function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    var data = [{ key: "text", value: e.target.value }];
    var updatedContent = lesson.content.map((block: any) => {
      if (block.id == id) return { ...block, data };
      return block;
    });

    // Optimistic update
    mutateLesson((data) => {
      return {
        ...data,
        lesson: { ...data!.lesson, content: updatedContent },
      } as any;
    }, false);

    await paragraphCallback({
      type: ContentBlockType.PARAGRAPH,
      data,
    });
  }

  return (
    <div className="w-full">
      <textarea
        className="w-full h-32 p-4 bg-background2 rounded-lg border border-border resize-none"
        value={textValue}
        onChange={handleChange}
      />
    </div>
  );
}
