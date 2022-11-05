import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";

import { useAppDispatch, useAppSelector, useCourse, useLesson, useModule } from "@lib/hooks";
import { addNewLessonToModule, selectCourse, selectCourseLoading, updateActiveLesson, updateActiveModule, updateActiveModuleId } from "@store/_course/slice";
import { createLessonThunk, createModuleThunk } from "@store/_course/thunk";

import Button from "./button";
import { AddIcon, ArrowRightIcon, DotIcon, DotsIcon, MenuIcon, SettingsIcon } from "./icons";

export default function CourseEditorLayout({ children }) {
  return (
    <div className="relative flex">
      <Sidebar />

      <div className="ml-[300px] flex-grow">
        <Navbar />
        {children}
      </div>
    </div>
  );
}

function Navbar() {
  var { course, courseId } = useCourse();
  var { moduleData, moduleId } = useModule();
  var { lesson } = useLesson();
  var router = useRouter();
  var dispatch = useAppDispatch();
  var { updating } = useAppSelector(selectCourse);

  function Breadcrumb() {
    return (
      <div>
        <div className="h-[34px] rounded-xl cursor-pointer flex items-center px-2">
          <span className="mr-2">{course?.emoji ?? "✌🏼"}</span>
          <span
            className="max-w-[200px] overflow-hidden whitespace-nowrap overflow-ellipsis"
            onClick={() => {
              dispatch(updateActiveModuleId(null));
              dispatch(updateActiveLesson(null));
              router.push(`/admin/c/${courseId}`);
            }}
          >
            {course?.title ?? "Untitled"}
          </span>
          {moduleData && (
            <>
              <span className="flex items-center justify-center text-[#B6B6B6] font-urbanist px-2 text-[14px] font-medium">
                /
              </span>
              <span className="mr-2">{moduleData?.emoji ?? "✌🏼"}</span>
              <span
                className="max-w-[200px] overflow-hidden whitespace-nowrap overflow-ellipsis"
                onClick={() => {
                  dispatch(updateActiveLesson(null));
                  router.push(`/admin/c/${courseId}/m/${moduleId}`);
                }}
              >
                {moduleData?.title ?? "Untitled"}
              </span>
            </>
          )}

          {lesson && (
            <>
              <span className="flex items-center justify-center text-[#B6B6B6] font-urbanist px-2 text-[14px] font-medium">
                /
              </span>
              <span className="mr-2">{lesson?.emoji ?? "✌🏼"}</span>
              <span className="max-w-[200px] overflow-hidden whitespace-nowrap overflow-ellipsis">
                {lesson?.title ?? "Untitled"}
              </span>
            </>
          )}

          <span className="mx-2 font-urbanist text-[14px] font-medium text-gray-300">
            {updating ? "Saving..." : ""}
          </span>
        </div>
      </div>
    );
  }

  return (
    <nav className="h-[60px] mb-6 flex justify-between items-center px-3 py2 border-b border-b-solid border-b-[#E9E9E9]">
      <Breadcrumb />

      <div className="flex items-center gap-4 justify-end">
        <div className="font-urbanist text-[14px] font-medium text-gray-300">
          Edited{" "}
          {router.pathname.includes("/l/")
            ? moment(lesson?.lastEditedOn).fromNow()
            : router.pathname.includes("/m/")
            ? moment(moduleData?.lastEditedOn).fromNow()
            : moment(course?.lastEditedOn).fromNow()}
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
  );
}

function Sidebar() {
  var router = useRouter();
  var dispatch = useAppDispatch();
  var { course, courseId } = useCourse();

  async function createNewModule() {
    var id = (await dispatch(createModuleThunk(courseId))).payload;
    if (id) {
      router.push(`/admin/c/${courseId}/m/${id}`);
    }
  }

  function Header() {
    return (
      <div className="h-[60px] flex items-center px-2 py-1 border-b border-b-solid border-b-[#E9E9E9]">
        <div className="bg-[#E1E4FF] text-[#3A4EFF] h-7 rounded-lg px-3 flex items-center justify-center text-[14px]">
          {course?.stage == "draft" ? "Draft" : "Published"}
        </div>
      </div>
    );
  }

  function NewModuleButton() {
    return (
      <div className="py-3 flex justify-center items-center">
        <button
          onClick={createNewModule}
          className="bg-[#E1E4FF] text-[#3A4EFF] h-12 px-6 rounded-2xl"
        >
          Add a new module
        </button>
      </div>
    );
  }

  return (
    <div
      id="sidebar"
      className="w-[300px] h-screen bg-gray-50 fixed flex flex-col gap-2"
    >
      <Header />

      <div className="font-gilroy font-extrabold text-[14px] pl-2 pb-3 text-gray-600">
        {course?.modules.length} module
      </div>

      <div className="flex-grow">
        {course?.modules.map((moduleData) => (
          <ModuleItem
            key={moduleData.id}
            moduleData={moduleData}
            course={course}
            courseId={courseId}
          />
        ))}
      </div>

      <NewModuleButton />
    </div>
  );
}

function ModuleItem({ course, courseId, moduleData }) {
  var router = useRouter();
  var dispatch = useAppDispatch();
  var [open, setOpen] = useState(false);

  return (
    <>
      {/* Module item */}
      <div
        onClick={() => {
          router.push(`/admin/c/${courseId}/m/${moduleData?.id}`);
          dispatch(updateActiveModuleId(moduleData?.id));
          dispatch(updateActiveLesson(null));
        }}
        key={module.id}
        className="h-[34px] group px-2 py-1 cursor-pointer hover:bg-gray-100 flex items-center gap-2"
      >
        <span
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
          className="p-[1px] rounded-md cursor-pointer hover:bg-slate-200"
        >
          <ArrowRightIcon
            className={`w-6 h-6 stroke-[#686868] ${
              open ? "rotate-90" : "rotate-0"
            }`}
          />
        </span>
        <span className="flex justify-center items-center p-[2px] h-5 w-5">
          {moduleData?.emoji ?? "✌🏼"}
        </span>
        <span className="text-[#686868] flex-grow">
          {moduleData?.title ?? "Untitled"}
        </span>

        <span
          onClick={async () => {
            var lesson = await (
              await dispatch(
                createLessonThunk({
                  courseId: course.id,
                  moduleId: moduleData.id,
                })
              )
            ).payload;
            if (lesson && (lesson as any).id) {
              dispatch(
                addNewLessonToModule({
                  moduleId: moduleData.id,
                  lesson: lesson as any,
                })
              );
              router.push(
                `/admin/c/${courseId}/m/${moduleData.id}/l/${
                  (lesson as any).id
                }`
              );
            }
          }}
          className="group-hover:block hidden p-[1px] rounded-md cursor-pointer hover:bg-slate-200"
        >
          <AddIcon className="w-6 h-6 fill-[#686868]" />
        </span>

        <span className="group-hover:block hidden p-[1px] rounded-md cursor-pointer hover:bg-slate-200">
          <DotsIcon className="w-6 h-6 fill-[#686868]" />
        </span>
      </div>

      {/* Module's lessons */}
      {open && (
        <div>
          {moduleData?.lessons.map((lesson) => (
            <div
              key={lesson.id}
              onClick={() => {
                dispatch(updateActiveModuleId(moduleData.id));
                router.push(
                  `/admin/c/${courseId}/m/${moduleData.id}/l/${lesson.id}`
                );
              }}
              className="h-[34px] group px-2 py-1 cursor-pointer hover:bg-gray-100 flex items-center gap-2"
            >
              <span className="w-6 h-6"></span>
              <span>
                <DotIcon className="w-5 h-5 fill-[#686868]" />
              </span>
              <span className="flex justify-center items-center p-[2px] h-5 w-5">
                {lesson.emoji ?? "✌🏼"}
              </span>
              <span className="text-[#686868] flex-grow">
                {lesson?.title ?? "Untitled"}
              </span>

              <span className="group-hover:block hidden p-[1px] rounded-md cursor-pointer hover:bg-slate-200">
                <DotsIcon className="w-6 h-6 fill-[#686868]" />
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
