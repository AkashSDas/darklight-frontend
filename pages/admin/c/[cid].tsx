import moment from "moment-timezone";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { MenuIcon, SettingsIcon } from "@components/icons";
import Button from "@components/shared/button";
import { useAppDispatch, useAppSelector } from "@hooks/store";
import { selectCourse } from "@store/_course/slice";
import { getCourseThunk } from "@store/_course/thunk";

function useCourse() {
  var router = useRouter();
  var dispatch = useAppDispatch();
  var courseId = router.query.cid as string;
  var { loading, course } = useAppSelector(selectCourse);

  useEffect(
    function getCourse() {
      if (!course && courseId) {
        dispatch(getCourseThunk(courseId));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [courseId, dispatch]
  );

  return { loading, course, courseId };
}

export default function CoursePage() {
  var router = useRouter();
  var { loading, course, courseId } = useCourse();

  if (loading || !courseId || !course) {
    return <div>Loading...</div>;
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

        <div className="flex-grow"></div>

        <div className="py-3 flex justify-center items-center">
          <button className="bg-[#E1E4FF] text-[#3A4EFF] h-12 px-6 rounded-2xl">
            Add a new lesson
          </button>
        </div>
      </div>

      <div className="ml-[300px] flex-grow">
        <nav className="h-[60px] flex justify-between items-center px-3 py2 border-b border-b-solid border-b-[#E9E9E9]">
          <div>
            <div
              onClick={() => router.push(`/admin/c/${courseId}`)}
              className="h-[34px] rounded-xl cursor-pointer flex items-center gap-2 px-2"
            >
              <span>{course.emoji ?? "✌🏼"}</span>
              <span>{course.title ?? "Untitled"}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-end">
            <div className="font-urbanist text-[14px] font-medium text-gray-300">
              Edited{" "}
              {moment(course.lastEditedOn).fromNow().split(" m")[0] + "m ago"}
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
      </div>
    </div>
  );
}
