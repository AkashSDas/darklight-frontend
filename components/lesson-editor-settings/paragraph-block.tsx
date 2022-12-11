import debounce from "lodash.debounce";
import { useCallback } from "react";
import { updateContent } from "services/lesson-content.service";

import { ContentBlockType } from "@lib/content-block";
import { useEditableGroup, useEditableLesson, useUser } from "@lib/hooks.lib";

export default function ParagraphBlock({ id }: { id: string }) {
  var { lesson, mutateLesson } = useEditableLesson();
  var block = lesson.content.find((block: any) => block.id == id);
  var textValue = block.data.find((block: any) => block.key == "text").value;
  var { courseId, group } = useEditableGroup();
  var { accessToken } = useUser();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  var paragraphCallback = useCallback(
    debounce(async (input) => {
      if (input && courseId && group?._id && lesson._id && accessToken) {
        await updateContent(
          courseId,
          group._id,
          lesson._id,
          id,
          ContentBlockType.PARAGRAPH,
          input,
          accessToken
        );
      }
    }, 500),

    [courseId, group?._id, lesson?._id]
  );

  return (
    <div className="w-full">
      <textarea
        className="w-full h-32 p-4 bg-background2 rounded-lg border border-border resize-none"
        value={textValue}
        onChange={async (e) => {
          let data = [{ key: "text", value: e.target.value }];
          let update = {
            lastEditedOn: new Date(Date.now()),
            content: lesson.content.map((block: any) => {
              if (block.id == id) return { ...block, data };
              return block;
            }),
          };

          let optimisticData = {
            success: true,
            error: null,
            lesson: { ...lesson, ...update },
          };

          await mutateLesson(async () => optimisticData, {
            optimisticData,
            revalidate: false,
          });

          await paragraphCallback(data);
        }}
      />
    </div>
  );
}
