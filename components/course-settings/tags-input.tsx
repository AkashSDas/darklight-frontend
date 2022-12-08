import { useState } from "react";

import { useDropdown, useEditableCourse, useUser } from "../../lib/hooks.lib";
import { updateCourseSettings } from "../../services/course.service";
import { TextBadge } from "../badges/text";
import { AddIcon } from "../icons/add";

export default function CourseTags() {
  var { isOpen, setIsOpen, wrapperRef } = useDropdown();
  var [value, setValue] = useState("");
  var { course, mutateCourse, courseId } = useEditableCourse();
  var { accessToken } = useUser();

  return (
    <section className="w-full flex justify-between items-center gap-2">
      <div className="flex flex-col gap-2 w-full">
        <div>
          <TextBadge variant="regular">🍞</TextBadge>{" "}
          <span className="text-text1">Tags</span>
        </div>

        <p className="text-sm">
          These tags will be used in various places, so be precise and concise
        </p>
      </div>

      {/* Dropdown input  */}
      <div
        ref={wrapperRef}
        onClick={() => setIsOpen(true)}
        className="relative max-w-[300px] w-full rounded-lg hover:bg-gray-50 h-[60px] cursor-pointer"
      >
        {/* Display tags */}
        <div className="flex flex-wrap gap-[6px] justify-end cursor-pointer p-1 h-full">
          {course?.tags.map((tag: string) => (
            <div
              key={tag}
              className="px-1 h-6 rounded-md flex justify-center items-center bg-background3  font-urbanist text-[14px] font-medium"
            >
              {tag}
            </div>
          ))}
          {course?.tags.length === 0 && (
            <div className="w-full flex justify-center items-center">
              <AddIcon size="18" /> <span> Add a tag</span>
            </div>
          )}
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className="z-10 absolute top-0 right-0 w-full px-2 py-2 rounded-lg bg-background1 border border-solid border-border shadow-lg flex flex-wrap gap-[6px]">
            <>
              {course?.tags.map((tag: string) => (
                <div
                  key={tag}
                  className="px-1 h-6 rounded-md flex justify-center items-center bg-background3 font-urbanist text-[14px] font-medium"
                >
                  {tag}{" "}
                  <div className="rotate-45">
                    <AddIcon size="18" />
                  </div>
                </div>
              ))}
            </>

            {/* Add tag input */}
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                let tag = value.trim();
                setValue("");

                let update = {
                  tags: [...course.tags, tag],
                  lastEditedOn: new Date(Date.now()),
                };
                let optimisticData = {
                  success: true,
                  course: { ...course, ...update },
                  error: null,
                };

                await mutateCourse(async () => optimisticData, {
                  optimisticData,
                  revalidate: false,
                });

                if (value && courseId && accessToken) {
                  await updateCourseSettings(accessToken, courseId, update);
                }
              }}
            >
              <input
                type="text"
                autoFocus
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Add a tag"
                className="w-full outline-none bg-background1 placeholder:text-border font-urbanist font-medium"
              />
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
