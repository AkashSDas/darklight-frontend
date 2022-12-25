import { ChangeEvent, useState } from "react";
import { updateCourseSettings } from "services/course.service";

import { AddIcon } from "@components/shared/icons";
import { useDropdown, useEditableCourse, useUser } from "@lib/hooks.lib";

import SettingSection from "./setting-section";

export default function CourseTagsSetting(): JSX.Element {
  var emoji = "🍞";
  var title = "Tags";
  var description =
    "These tags will be used in various places, so be precise and concise";
  var info = { emoji, title, description };

  return (
    <SettingSection {...info}>
      <TagsDropdown />
    </SettingSection>
  );
}

function TagsDropdown(): JSX.Element {
  var { accessToken } = useUser();
  var { isOpen, setIsOpen, wrapperRef } = useDropdown();
  var { course, mutateCourse, courseId } = useEditableCourse();

  function DisplayTags(): JSX.Element {
    return (
      <div className="flex flex-wrap gap-[6px] justify-end cursor-pointer p-1 h-full">
        {/* Display tags */}
        {course?.tags.map((tag: string) => (
          <div
            key={tag}
            className="px-1 h-6 rounded-md flex justify-center items-center bg-background3 text-sm"
          >
            {tag}
          </div>
        ))}

        {/* Add icon displayed when there are no tags */}
        {course?.tags.length == 0 && (
          <div className="w-full flex justify-center items-center">
            <span className="icon">
              <AddIcon size="size_4" />
            </span>{" "}
            <span> Add a tag</span>
          </div>
        )}
      </div>
    );
  }

  function RemoveTagButton({ tag }: { tag: string }): JSX.Element {
    async function removeTag() {
      mutateCourse(
        (data) =>
          ({
            ...data,
            course: {
              ...data?.course,
              tags: [...course.tags].filter((t: string) => t != tag),
            },
          } as any),
        false
      );

      await updateCourseSettings(accessToken, courseId, {
        tags: [...course.tags].filter((t: string) => t != tag),
      });
    }

    return (
      <div className="icon rotate-45" onClick={removeTag}>
        <AddIcon size="size_4" />
      </div>
    );
  }

  function DisplayTagsToRemove(): JSX.Element {
    return (
      <>
        {course?.tags.map((tag: string) => (
          <div
            key={tag}
            className="px-1 h-6 rounded-md flex justify-center items-center bg-background3 font-urbanist text-[14px] font-medium"
          >
            {tag} <RemoveTagButton tag={tag} />
          </div>
        ))}
      </>
    );
  }

  function AddTagInput(): JSX.Element {
    var [value, setValue] = useState("");

    async function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
      e.preventDefault();
      var tag = value.trim();
      setValue("");

      mutateCourse(
        (data) =>
          ({
            ...data,
            course: { ...data?.course, tags: [...course.tags, tag] },
          } as any),
        false
      );

      await updateCourseSettings(accessToken, courseId, {
        tags: [...course.tags, tag],
      });
    }

    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add a tag"
          className="w-full outline-none bg-background1 placeholder:text-border font-urbanist font-medium"
        />
      </form>
    );
  }

  function TagsDropdown(): JSX.Element | null {
    if (!isOpen) return null;
    return (
      <div className="z-10 absolute top-0 right-0 w-full px-2 py-2 rounded-lg bg-background1 border border-solid border-border shadow-lg flex gap-[6px] flex-wrap">
        <DisplayTagsToRemove />
        <AddTagInput />
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      onClick={() => setIsOpen(true)}
      className="relative w-full max-w-[300px] h-[60px] rounded-lg hover:bg-gray-50 cursor-pointer"
    >
      <DisplayTags />
      <TagsDropdown />
    </div>
  );
}
