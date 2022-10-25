import { ReactElement, useEffect, useRef, useState } from "react";

import Text from "@components/editor/text";
import EmojiPicker from "@components/emoji-picker";
import CourseEditorLayout from "@components/layout/course-editor";
import { useOutsideAlerter } from "@hooks/outsider-alerter";
import { useAppDispatch, useAppSelector } from "@hooks/store";
import { selectEditableCourse, setModule } from "@store/editable-course/slice";
import { updateCourseModuleThunk } from "@store/editable-course/thunk";

function ModuleEmojiPicker() {
  var { activeModule, course } = useAppSelector(selectEditableCourse);
  var wrapperRef = useRef(null);
  var [isOpen, setIsOpen] = useState(false);
  useOutsideAlerter(wrapperRef, function updateDropdownOnOutsideClick() {
    setIsOpen(false);
  });
  var dispatch = useAppDispatch();
  var handleClose = () => setIsOpen(false);

  return (
    <div
      onClick={() => setIsOpen(true)}
      ref={wrapperRef}
      className="relative cursor-pointer w-[70px] h-[70px] p-2 flex items-center justify-center rounded-md hover:bg-grey2 active:bg-grey3"
    >
      <span className="text-[70px]">{activeModule?.emoji ?? "📄"}</span>
      {isOpen && (
        <div className="absolute top-0 left-0">
          <EmojiPicker
            onSelect={async (emoji) => {
              await dispatch(
                updateCourseModuleThunk({
                  payload: { ...activeModule, emoji: emoji.native },
                  moduleId: activeModule?.id,
                  courseId: course?.id,
                })
              );
              dispatch(
                setModule({
                  module: { ...activeModule, emoji: emoji.native },
                  editing: true,
                })
              );
              setIsOpen(false);
            }}
            handleClose={handleClose}
          />
        </div>
      )}
    </div>
  );
}

function ModulePage({}) {
  var { isLoading, activeModule, course } =
    useAppSelector(selectEditableCourse);
  var dispatch = useAppDispatch();

  if (isLoading || !activeModule?.id) {
    return (
      <div className="ml-[240px] mt-4 flex flex-col justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="ml-[240px] mt-4 flex flex-col justify-center items-center">
      <main className="w-full flex flex-col py-2 px-[96px] max-w-[900px]">
        <div className="w-full">
          <ModuleEmojiPicker />
          <div className="w-full h-[6px]"></div>
          <Text
            size="h2"
            text={activeModule?.title}
            placeholder="Untitled"
            onChange={async (value) => {
              if (value) {
                dispatch(
                  setModule({
                    module: { ...activeModule, title: value },
                    editing: true,
                  })
                );
                await dispatch(
                  updateCourseModuleThunk({
                    payload: { ...activeModule, title: value },
                    moduleId: activeModule?.id,
                    courseId: course?.id,
                  })
                );
              }
            }}
          />
        </div>
      </main>
    </div>
  );
}

ModulePage.getLayout = function getLayout(page: ReactElement) {
  return <CourseEditorLayout>{page}</CourseEditorLayout>;
};

export default ModulePage;
