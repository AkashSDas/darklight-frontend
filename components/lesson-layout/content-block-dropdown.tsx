import { useState } from "react";

import { ArrowDownIcon } from "@components/icons/arrow-down";
import { TableIcon } from "@components/icons/table";
import { contentBlocks } from "@lib/content-block";

export default function ContentBlockDropdown() {
  var [show, setShow] = useState(true);

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

  return (
    <div className="flex flex-col gap-3">
      <Header />

      {show && (
        <div className="flex flex-col px-3 gap-2">
          {contentBlocks.map((block) => (
            <div
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
