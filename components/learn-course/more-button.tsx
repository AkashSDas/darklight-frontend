import { useRouter } from "next/router";
import { useState } from "react";

import { MoreIcon, TrashIcon } from "@components/shared/icons";
import { useAppSelector, useDropdown } from "@lib/hooks.lib";

export default function MoreButton() {
  var router = useRouter();
  var { wrapperRef, isOpen, setIsOpen } = useDropdown();
  var [context, setContext] = useState<"course" | "group" | "lesson" | null>(
    null
  );
  var context = useAppSelector((state) => state.enrolledCourse.dropdownContext);

  function Dropdown(): JSX.Element {
    return (
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-11 right-0 px-2 py-1 w-[300px] flex flex-col bg-background1 border border-solid border-border rounded-md shadow-xl"
      >
        {context == "course" ? <CoursePanel /> : null}
        {context == "group" ? <GroupPanel /> : null}
        {context == "lesson" ? <LessonPanel /> : null}
      </div>
    );
  }

  function CoursePanel(): JSX.Element {
    return (
      <>
        <div className="p-2 flex gap-2 items-center hover:bg-background3 active:bg-border rounded-md">
          <span className="icon">
            <TrashIcon size="size_4" />
          </span>

          <span className="text-sm">Delete course</span>
        </div>
      </>
    );
  }

  function GroupPanel(): JSX.Element {
    return (
      <>
        <div className="p-2 flex gap-2 items-center hover:bg-background3 active:bg-border rounded-md">
          <span className="icon">
            <TrashIcon size="size_4" />
          </span>

          <span className="text-sm">Delete group</span>
        </div>
      </>
    );
  }

  function LessonPanel(): JSX.Element {
    return (
      <>
        <div className="p-2 flex gap-2 items-center hover:bg-background3 active:bg-border rounded-md">
          <span className="icon">
            <TrashIcon size="size_4" />
          </span>

          <span className="text-sm">Delete lesson</span>
        </div>
      </>
    );
  }

  return (
    <button
      className="icon_btn relative"
      ref={wrapperRef}
      onClick={() => setIsOpen(!isOpen)}
    >
      <MoreIcon size="size_5" />

      {isOpen && context ? <Dropdown /> : null}
    </button>
  );
}
