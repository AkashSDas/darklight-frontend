import { useState } from "react";

import CourseEditorLayout from "@components/shared/course-editor-layout";
import EmojiPicker from "@components/shared/emoji-picker";
import { useAppDispatch, useAppSelector, useCourse, useDropdown, useModule, useResizeTextareaHeight } from "@lib/hooks";
import { selectActiveModule, updateActiveModule } from "@store/_course/slice";

export default function ModulePage() {
  var { loading, course, courseId } = useCourse();
  var { moduleId, moduleLoading, moduleData } = useModule();

  if (
    loading ||
    !courseId ||
    !course ||
    moduleLoading ||
    !moduleId ||
    !moduleData
  ) {
    return <div>Loading...</div>;
  }

  return <ModuleSettings />;
}

function ModuleSettings() {
  var dispatch = useAppDispatch();
  var { isOpen, setIsOpen, wrapperRef } = useDropdown();
  var moduleData = useAppSelector(selectActiveModule);

  function EmojiInput() {
    return (
      <div
        onClick={() => setIsOpen(true)}
        ref={wrapperRef}
        className="relative mb-3 w-[50px] h-[50px]"
      >
        <div className="flex justify-center items-center w-[50px] h-[50px] text-[50px] cursor-pointer hover:bg-gray-100 rounded-lg font-urbanist">
          {moduleData.emoji ?? "✌🏼"}
        </div>
        {isOpen && (
          <EmojiPicker
            onSelect={(emoji) => {
              dispatch(
                updateActiveModule({ ...moduleData, emoji: emoji.native })
              );
              setIsOpen(false);
            }}
            handleClose={() => setIsOpen(false)}
          />
        )}
      </div>
    );
  }

  function TitleInput({ title }: { title: string }) {
    var [value, setValue] = useState(title);
    var { ref } = useResizeTextareaHeight(value);

    return (
      <textarea
        ref={ref}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        onKeyDownCapture={(e) => {
          if (e.key == "Enter") e.preventDefault();
        }}
        placeholder="Untitled"
        className="w-full outline-none resize-none placeholder:text-[#E9E9E9] font-gilroy font-extrabold text-[39.1px] leading-[100%]"
      />
    );
  }

  function Divider() {
    return <div className="h-[1px] bg-[#F5F5F5]"></div>;
  }

  function DeleteModule({ id }) {
    return (
      <div className="flex justify-between gap-1">
        <div className="flex flex-col gap-2">
          <div className="font-urbanist font-bold">Delete</div>
          <div className="font-urbanist font-medium text-[#686868] text-[14px]">
            Irreversilble action!
          </div>
        </div>

        <div className="relative max-w-[300px] w-full flex justify-end">
          <button className="h-11 px-6 rounded-2xl bg-[#FFECEB] text-[#EA4335]">
            Delete
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[600px] w-full">
        <EmojiInput />
        <TitleInput title={moduleData.title ?? ""} />
        <div className="mt-4 flex flex-col gap-4">
          <Divider />
          <DeleteModule id={moduleData.id} />
        </div>
      </div>
    </div>
  );
}

ModulePage.getLayout = function getLayout(page) {
  return <CourseEditorLayout>{page}</CourseEditorLayout>;
};
