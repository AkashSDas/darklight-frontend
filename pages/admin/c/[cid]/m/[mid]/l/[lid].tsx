import { useRouter } from "next/router";
import { useState } from "react";

import CourseEditorLayout from "@components/shared/course-editor-layout";
import EmojiPicker from "@components/shared/emoji-picker";
import { useAppDispatch, useAppSelector, useCourse, useDropdown, useLesson, useModule, useResizeTextareaHeight } from "@lib/hooks";
import { selectActiveLesson, updateActiveLesson } from "@store/_course/slice";
import { createModuleThunk } from "@store/_course/thunk";

export default function LessonPage() {
  var router = useRouter();
  var dispatch = useAppDispatch();
  var { loading, course, courseId } = useCourse();
  var { moduleId, moduleLoading, moduleData } = useModule();
  var { lesson, lessonId, lessonLoading } = useLesson();

  if (
    loading ||
    !courseId ||
    !course ||
    moduleLoading ||
    !moduleId ||
    !moduleData ||
    !lesson ||
    !lessonId ||
    lessonLoading
  ) {
    return (
      <div>
        <div className="flex justify-center items-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"></div>
        </div>
      </div>
    );
  }

  async function createNewModule() {
    var id = (await dispatch(createModuleThunk(courseId))).payload;
    if (id) router.push(`/admin/c/${courseId}/m/${id}`);
  }

  return <LessonEditor />;
}

function LessonEditor() {
  var dispatch = useAppDispatch();
  var { isOpen, setIsOpen, wrapperRef } = useDropdown();
  var lesson = useAppSelector(selectActiveLesson);

  function EmojiInput() {
    return (
      <div
        onClick={() => setIsOpen(true)}
        ref={wrapperRef}
        className="relative mb-3 w-[50px] h-[50px]"
      >
        <div className="flex justify-center items-center w-[50px] h-[50px] text-[50px] cursor-pointer hover:bg-gray-100 rounded-lg font-urbanist">
          {lesson.emoji ?? "✌🏼"}
        </div>
        {isOpen && (
          <EmojiPicker
            onSelect={(emoji) => {
              dispatch(updateActiveLesson({ ...lesson, emoji: emoji.native }));
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

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[600px] w-full">
        <EmojiInput />
        <TitleInput title={lesson.title ?? ""} />
        <div className="mt-4 flex flex-col gap-4">
          <Divider />
        </div>
      </div>
    </div>
  );
}

LessonPage.getLayout = function getLayout(page) {
  return <CourseEditorLayout>{page}</CourseEditorLayout>;
};
