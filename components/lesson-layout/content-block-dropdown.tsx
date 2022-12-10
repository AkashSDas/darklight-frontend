import { useState } from "react";
import toast from "react-hot-toast";
import { createContent } from "services/lesson-content.service";

import { ArrowDownIcon } from "@components/icons/arrow-down";
import { TableIcon } from "@components/icons/table";
import { contentBlocks, ContentBlockType } from "@lib/content-block";
import { useEditableGroup, useEditableLesson, useUser } from "@lib/hooks.lib";

export default function ContentBlockDropdown() {
  var [show, setShow] = useState(true);
  var { accessToken } = useUser();
  var { lesson, mutateLesson } = useEditableLesson();
  var { courseId, group } = useEditableGroup();

  function Header() {
    return (
      <div className="mx-4 flex items-center gap-3">
        <TableIcon size="18" />
        <span className="font-urbanist font-medium text-text2 flex-grow">
          Content Block
        </span>
        <div
          onClick={() => setShow(!show)}
          className={`${
            show ? "rotate-180" : ""
          } flex justify-center items-center p-[2px] rounded-md hover:bg-background3 active:bg-border cursor-pointer`}
        >
          <ArrowDownIcon size="20" />
        </div>
      </div>
    );
  }

  var [loading, setLoading] = useState(false);

  async function addContentBlock(type: ContentBlockType) {
    if (loading) return;

    if (courseId && group?._id && lesson._id && accessToken) {
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
      }

      await mutateLesson();

      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <Header />

      {show && (
        <div className="flex flex-col px-3 gap-2">
          {contentBlocks.map((block) => (
            <div
              onClick={() => addContentBlock(block.type)}
              key={block.name}
              className="w-full flex gap-3 px-1 py-2 justify-center cursor-pointer hover:bg-background3 active:bg-border rounded-md"
            >
              <span>{block.icon}</span>

              <div className="flex-grow flex flex-col gap-[2px]">
                <span className="font-urbanist font-semibold text-sm text-text1">
                  {block.name}
                </span>
                <span className="font-urbanist text-[12.8px] text-text2">
                  {block.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
