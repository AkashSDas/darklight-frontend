import { useState } from "react";
import toast from "react-hot-toast";
import { createContent } from "services/lesson-content.service";

import { ArrowIcon, GridIcon } from "@components/shared/icons";
import { contentBlocks, ContentBlockType } from "@lib/content-block";
import { useEditableGroup, useEditableLesson, useUser } from "@lib/hooks.lib";

export default function ContentBlockOptions(): JSX.Element {
  var { accessToken } = useUser();
  var [display, setDisplay] = useState(false);
  var { lesson, mutateLesson } = useEditableLesson();
  var { courseId, group } = useEditableGroup();
  var [loading, setLoading] = useState(false);

  var rotateStyle = `${display ? "rotate-180" : ""}`;

  function Header(): JSX.Element {
    return (
      <div className="mx-4 flex items-center gap-3">
        <div className="icon">
          <GridIcon size="size_4" />
        </div>
        <span className="flex-grow">Content Block</span>
        <div
          onClick={() => setDisplay(!display)}
          className={`icon ${rotateStyle} flex justify-center items-center p-[2px] rounded-md hover:bg-background3 active:bg-border cursor-pointer`}
        >
          <ArrowIcon size="size_5" />
        </div>
      </div>
    );
  }

  async function addContentBlock(type: ContentBlockType) {
    if (loading) return;
    setLoading(true);

    var response = await createContent(
      courseId,
      group._id,
      lesson._id,
      type,
      accessToken
    );

    if (response.success) {
      toast.success("Content block added");
      await mutateLesson();
    }

    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-3">
      <Header />

      {display && (
        <div className="px-3 flex flex-col gap-2">
          {contentBlocks.map((block) => (
            <div
              onClick={() => addContentBlock(block.type)}
              key={block.name}
              className="px-1 py-2 w-full flex gap-3 justify-center cursor-pointer hover:bg-background3 active:bg-border rounded-md"
            >
              <span>{block.icon}</span>

              <div className="flex-grow flex flex-col gap-[2px]">
                <span className="text-sm text-text1">{block.name}</span>
                <span className="text-[12.8px]">{block.description}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
