import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";

import EmojiPicker from "@components/emoji-picker";
import { ArrowRightIcon, MenuIcon, SettingsIcon } from "@components/icons";
import Button from "@components/shared/button";
import { AddIcon, DotsIcon } from "@components/shared/icons";
import { useAppDispatch, useAppSelector } from "@hooks/store";
import { useCourse, useDropdown, useModule, useResizeTextareaHeight } from "@lib/hooks";
import { selectActiveModule, selectCourse, updateActiveModule, updateActiveModuleId } from "@store/_course/slice";
import { createLessonThunk, createModuleThunk } from "@store/_course/thunk";

export default function ModulePage() {
  var router = useRouter();
  var dispatch = useAppDispatch();
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

  async function createNewModule() {
    var id = (await dispatch(createModuleThunk(courseId))).payload;
    if (id) router.push(`/admin/c/${courseId}/m/${id}`);
  }

  return (
    <div className="relative flex">
      <div
        id="sidebar"
        className="w-[300px] h-screen bg-gray-50 fixed flex flex-col gap-2"
      >
        <div className="h-[60px] flex items-center px-2 py-1 border-b border-b-solid border-b-[#E9E9E9]">
          <div className="bg-[#E1E4FF] text-[#3A4EFF] h-7 rounded-lg px-3 flex items-center justify-center text-[14px]">
            {course.stage == "draft" ? "Draft" : "Published"}
          </div>
        </div>

        <div className="font-gilroy font-extrabold text-[14px] pl-2 pb-3 text-gray-600">
          {course.modules.length} module
        </div>

        <div className="flex-grow">
          {course.modules.map((module) => (
            <div
              onClick={() => {
                router.push(`/admin/c/${courseId}/m/${module.id}`);
                dispatch(updateActiveModuleId(module.id));
              }}
              key={module.id}
              className="h-[34px] group px-2 py-1 cursor-pointer hover:bg-gray-100 flex items-center gap-2"
            >
              <span className="p-[1px] rounded-md cursor-pointer hover:bg-slate-200">
                <ArrowRightIcon className="w-6 h-6 stroke-[#686868]" />
              </span>
              <span className="flex justify-center items-center p-[2px] h-5 w-5">
                {module.emoji ?? "✌🏼"}
              </span>
              <span className="text-[#686868] flex-grow">
                {module?.title ?? "Untitled"}
              </span>

              <span
                onClick={async () => {
                  var id = await (
                    await dispatch(
                      createLessonThunk({
                        courseId: course.id,
                        moduleId: module.id,
                      })
                    )
                  ).payload;
                  console.log(id);
                  if (id)
                    router.push(`/admin/c/${courseId}/m/${module.id}/l/${id}`);
                }}
                className="group-hover:block hidden p-[1px] rounded-md cursor-pointer hover:bg-slate-200"
              >
                <AddIcon className="w-6 h-6 fill-[#686868]" />
              </span>

              <span className="group-hover:block hidden p-[1px] rounded-md cursor-pointer hover:bg-slate-200">
                <DotsIcon className="w-6 h-6 fill-[#686868]" />
              </span>
            </div>
          ))}
        </div>

        <div className="py-3 flex justify-center items-center">
          <button
            onClick={createNewModule}
            className="bg-[#E1E4FF] text-[#3A4EFF] h-12 px-6 rounded-2xl"
          >
            Add a new module
          </button>
        </div>
      </div>

      <div className="ml-[300px] flex-grow">
        <nav className="h-[60px] mb-6 flex justify-between items-center px-3 py2 border-b border-b-solid border-b-[#E9E9E9]">
          <div>
            <div
              onClick={() => router.push(`/admin/c/${courseId}`)}
              className="h-[34px] rounded-xl cursor-pointer flex items-center px-2"
            >
              <span className="mr-2">{course.emoji ?? "✌🏼"}</span>
              <span>{course.title ?? "Untitled"}</span>
              {moduleData && (
                <span className="flex items-center justify-center text-[#B6B6B6] font-urbanist px-2 text-[14px] font-medium">
                  /
                </span>
              )}
              <span className="mr-2">{moduleData.emoji ?? "✌🏼"}</span>
              <span>{moduleData.title ?? "Untitled"}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-end">
            <div className="font-urbanist text-[14px] font-medium text-gray-300">
              Edited{" "}
              {moduleData
                ? moment(moduleData.lastEditedOn).fromNow().split(" m")[0] +
                  "m ago"
                : moment(course.lastEditedOn).fromNow().split(" m")[0] +
                  "m ago"}
            </div>

            <Button
              variant="text"
              size="md"
              label="My courses"
              onClick={() => {}}
              className="!px-3"
            />
            <Button
              variant="text"
              size="md"
              label="Search"
              onClick={() => {}}
              className="!px-3"
            />

            <div className="h-[22px] w-[1px] bg-gray-200"></div>

            <Button
              variant="icon"
              size="md"
              label="Settings"
              startIcon={<SettingsIcon className="fill-black" />}
              onClick={() => {}}
              className="!px-3"
            />
            <Button
              variant="icon"
              size="md"
              label="Menu"
              startIcon={<MenuIcon className="fill-black" />}
              onClick={() => {}}
              className="!px-3"
            />
          </div>
        </nav>

        <ModuleSettings />
      </div>
    </div>
  );
}

function ModuleSettings() {
  var dispatch = useAppDispatch();
  var { isOpen, setIsOpen, wrapperRef } = useDropdown();
  var { loading, course } = useAppSelector(selectCourse);
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
