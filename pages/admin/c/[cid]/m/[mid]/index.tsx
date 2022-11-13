import { useRouter } from "next/router";

import CourseEditorLayout from "@components/shared/course-editor-layout";
import EmojiPicker from "@components/shared/emoji-picker";
import { useAppDispatch, useAppSelector, useCourse, useDropdown, useModule, useResizeTextareaHeight, useSaveModuleData } from "@lib/hooks";
import { selectActiveModule, selectCourseData, updateActiveModule } from "@store/_course/slice";
import { deleteModuleThunk } from "@store/_course/thunk";

export default function ModulePage() {
  var { loading, course, courseId } = useCourse();
  var { moduleId, moduleLoading, moduleData } = useModule();
  var isLoading =
    loading ||
    !courseId ||
    !course ||
    moduleLoading ||
    !moduleId ||
    !moduleData;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <ModuleSettings />;
}

ModulePage.getLayout = function getLayout(page) {
  return <CourseEditorLayout>{page}</CourseEditorLayout>;
};

function ModuleSettings() {
  useSaveModuleData();

  function Divider() {
    return <div className="h-[1px] bg-[#F5F5F5]"></div>;
  }

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[600px] w-full">
        <EmojiInput />

        <TitleInput />
        <div className="mt-4 flex flex-col gap-4">
          <Divider />
          <DeleteModule />
        </div>
      </div>
    </div>
  );
}

function EmojiInput() {
  var { isOpen, setIsOpen, wrapperRef } = useDropdown();
  var moduleData = useAppSelector(selectActiveModule);
  var dispatch = useAppDispatch();

  function handleEmojiSelect(emoji: any) {
    setIsOpen(false);
    dispatch(
      updateActiveModule({
        ...moduleData,
        emoji: emoji.native,
        lastEditedOn: new Date().toISOString(),
      })
    );
  }

  return (
    <div
      onClick={() => setIsOpen(true)}
      ref={wrapperRef}
      className="relative mb-3 w-[50px] h-[50px]"
    >
      {/* Current emoji */}
      <div className="flex justify-center items-center w-[50px] h-[50px] text-[50px] cursor-pointer hover:bg-gray-100 rounded-lg font-urbanist">
        {moduleData.emoji ?? "✌🏼"}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <EmojiPicker
          onSelect={handleEmojiSelect}
          handleClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

function TitleInput() {
  var { ref } = useResizeTextareaHeight(moduleData?.title ?? "");
  var moduleData = useAppSelector(selectActiveModule);
  var dispatch = useAppDispatch();

  return (
    <textarea
      ref={ref}
      onChange={(e) => {
        dispatch(
          updateActiveModule({
            ...moduleData,
            title: e.target.value,
            lastEditedOn: new Date().toISOString(),
          })
        );
      }}
      value={moduleData.title ?? ""}
      onKeyDownCapture={(e) => {
        if (e.key == "Enter") e.preventDefault();
      }}
      placeholder="Untitled"
      className="w-full outline-none resize-none placeholder:text-[#E9E9E9] font-gilroy font-extrabold text-[39.1px] leading-[100%]"
    />
  );
}

function DeleteModule() {
  var router = useRouter();
  var { id: courseId } = useAppSelector(selectCourseData);
  var dispatch = useAppDispatch();

  async function handleDelete() {
    await dispatch(deleteModuleThunk());
    router.push(`/admin/c/${courseId}`);
  }

  return (
    <div className="flex justify-between gap-1">
      <div className="flex flex-col gap-2">
        <div className="font-urbanist font-bold">Delete</div>
        <div className="font-urbanist font-medium text-[#686868] text-[14px]">
          Irreversilble action!
        </div>
      </div>

      <div className="relative max-w-[300px] w-full flex justify-end">
        <button
          onClick={handleDelete}
          className="h-11 px-6 rounded-2xl bg-[#FFECEB] text-[#EA4335]"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
