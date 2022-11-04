import moment from "moment-timezone";
import { useRouter } from "next/router";
import { useState } from "react";

import Button from "@components/shared/button";
import EmojiPicker from "@components/shared/emoji-picker";
import { AddIcon, ArrowDownIcon, MenuIcon, SettingsIcon } from "@components/shared/icons";
import { useAppDispatch, useAppSelector, useCourse, useDropdown, useResizeTextareaHeight } from "@lib/hooks";
import { selectCourse, updateCourse } from "@store/_course/slice";
import { createModuleThunk, getCourseThunk } from "@store/_course/thunk";

export default function CoursePage() {
  var router = useRouter();
  var dispatch = useAppDispatch();
  var { loading, course, courseId } = useCourse();

  if (loading || !courseId || !course) {
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

        <div className="flex-grow"></div>

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

        <CourseSettings />
      </div>
    </div>
  );
}

function CourseSettings() {
  var dispatch = useAppDispatch();
  var { isOpen, setIsOpen, wrapperRef } = useDropdown();
  var { loading, course } = useAppSelector(selectCourse);

  function EmojiInput() {
    return (
      <div
        onClick={() => setIsOpen(true)}
        ref={wrapperRef}
        className="relative mb-3 w-[50px] h-[50px]"
      >
        <div className="flex justify-center items-center w-[50px] h-[50px] text-[50px] cursor-pointer hover:bg-gray-100 rounded-lg font-urbanist">
          {course.emoji ?? "✌🏼"}
        </div>
        {isOpen && (
          <EmojiPicker
            onSelect={(emoji) => {
              dispatch(updateCourse({ ...course, emoji: emoji.native }));
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

  function DescriptionInput({ description }: { description: string }) {
    var [value, setValue] = useState(description);
    var { ref } = useResizeTextareaHeight(value);

    return (
      <textarea
        ref={ref}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        onKeyDownCapture={(e) => {
          if (e.key == "Enter") e.preventDefault();
        }}
        placeholder="Add a description"
        className="w-full outline-none resize-none placeholder:text-[#E9E9E9] font-urbanist font-medium"
      />
    );
  }

  function Divider() {
    return <div className="h-[1px] bg-[#F5F5F5]"></div>;
  }

  if (loading || !course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[600px] w-full">
        <EmojiInput />
        <TitleInput title={course.title ?? ""} />
        <DescriptionInput description={course.description ?? ""} />

        <div className="mt-4 flex flex-col gap-4">
          <Divider />
          <TagsInput id={course.id} tags={course.tags} />
          <Divider />
          <DifficultInput id={course.id} difficulty={course.difficulty} />
          <Divider />
          <PriceInput id={course.id} price={course.price} />
          <Divider />
          <PublishInput id={course.id} stage={course.stage} />
          <Divider />
          <DeleteCourse id={course.id} />
        </div>
      </div>
    </div>
  );
}

function DeleteCourse({ id }) {
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

function PublishInput({ id, stage }) {
  var [active, setActive] = useState(stage == "draft" ? false : true);

  return (
    <div className="flex justify-between gap-1">
      <div className="flex flex-col gap-2">
        <div className="font-urbanist font-bold">Publish</div>
        <div className="font-urbanist font-medium text-[#686868] text-[14px]">
          Make it public for other to see and purchase
        </div>
      </div>

      <div className="relative max-w-[300px] w-full flex justify-end">
        <div
          onClick={() => setActive(!active)}
          className="flex justify-between items-center cursor-pointer"
        >
          <div
            className={`w-14 h-8 ${
              !active ? "bg-gray-300" : "bg-blue2"
            }  rounded-full flex-shrink-0 p-1`}
          >
            <div
              className={`bg-white w-6 h-6 rounded-full shadow-md transform ${
                active ? "translate-x-6" : ""
              } duration-300 ease-in-out`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PriceInput({ id, price }) {
  var [value, setValue] = useState("");

  return (
    <div className="flex justify-between gap-1">
      <div className="flex flex-col gap-2">
        <div className="font-urbanist font-bold">Price</div>
        <div className="font-urbanist font-medium text-[#686868] text-[14px]">
          How much will students pay for this course?
        </div>
      </div>

      <div className="relative max-w-[300px] w-full flex justify-end">
        <div className="w-[180px] flex items-center px-3 rounded-2xl h-11 border border-solid border-[#E9E9E9] font-urbanist text-base">
          <input
            id="price"
            value={value}
            type="number"
            autoComplete="off"
            min={0}
            onChange={(e) => setValue(e.target.value)}
            className="w-full outline-none flex-grow font-urbanist"
          />

          <div className="h-6 w-6 flex justify-center items-center rounded-md">
            💷
          </div>
        </div>
      </div>
    </div>
  );
}

function DifficultInput({ id, difficulty }) {
  var { isOpen, setIsOpen, wrapperRef } = useDropdown();
  var [value, setValue] = useState("");

  return (
    <div className="flex justify-between gap-1">
      <div className="flex flex-col gap-2">
        <div className="font-urbanist font-bold">Difficulty</div>
        <div className="font-urbanist font-medium text-[#686868] text-[14px]">
          Who is your target audience?
        </div>
      </div>

      <div className="relative max-w-[300px] w-full flex justify-end">
        <div
          className="w-[180px] rounded-2xl h-11 border border-solid border-[#E9E9E9] flex gap-2 items-center cursor-pointer p-[6px]"
          ref={wrapperRef}
          onClick={() => setIsOpen(true)}
        >
          <span className="w-5 h-5 flex justify-center items-center">
            {difficulty == "beginner"
              ? "👶"
              : difficulty == "intermediate"
              ? "👦"
              : "👨"}
          </span>{" "}
          <span className="text-[#686868] font-semibold font-urbanist flex-grow">
            {difficulty == "beginner"
              ? "Beginner"
              : difficulty == "intermediate"
              ? "Intermediate"
              : "Advanced"}
          </span>
          <span>
            <ArrowDownIcon className="h-6 w-6 stroke-[#686868]" />
          </span>
        </div>

        {isOpen && (
          <div className="z-10 absolute top-0 right-0 w-[180px] px-2 py-3 rounded-xl bg-white border border-solid border-gray-100 shadow-lg flex flex-wrap gap-[6px]">
            <div className="w-full">
              {["beginner", "intermediate", "advanced"].map((difficulty) => (
                <div
                  key={difficulty}
                  className="h-7 w-full px-[2px] flex items-center rounded-lg gap-1 cursor-pointer hover:bg-gray-100"
                >
                  <span className="w-5 h-5 flex justify-center items-center">
                    {difficulty == "beginner"
                      ? "👶"
                      : difficulty == "intermediate"
                      ? "👦"
                      : "👨"}
                  </span>

                  <span className="text-[#686868] font-medium font-urbanist flex-grow text-[14px]">
                    {difficulty == "beginner"
                      ? "Beginner"
                      : difficulty == "intermediate"
                      ? "Intermediate"
                      : "Advanced"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// TODO: use id and tags from props
function TagsInput({ id, tags }) {
  var { isOpen, setIsOpen, wrapperRef } = useDropdown();
  var [value, setValue] = useState("");

  return (
    <div className="flex justify-between gap-1">
      <div className="flex flex-col gap-2">
        <div className="font-urbanist font-bold">Tags</div>
        <div className="font-urbanist font-medium text-[#686868] text-[14px]">
          Use tags to rank your course higher
        </div>
      </div>

      <div
        ref={wrapperRef}
        onClick={() => setIsOpen(true)}
        className="relative max-w-[300px] w-full rounded-lg hover:bg-gray-50"
      >
        <div className="flex flex-wrap gap-[6px] justify-end cursor-pointer p-1">
          {[
            "JavaScript",
            "Programming language",
            "this keyword",
            "Prototype",
            "Functions",
            "ES6",
            "Objects",
          ].map((tag) => (
            <div
              key={tag}
              className="px-3 h-7 rounded-lg flex justify-center items-center bg-[#E1E4FF] text-[#3A4EFF] font-urbanist text-[14px] font-medium"
            >
              {tag}
            </div>
          ))}
        </div>

        {isOpen && (
          <div className="z-10 absolute top-0 right-0 w-full px-2 py-3 rounded-xl bg-white border border-solid border-gray-100 shadow-lg flex flex-wrap gap-[6px]">
            <>
              {[
                "JavaScript",
                "Programming language",
                "this keyword",
                "Prototype",
                "Functions",
                "ES6",
                "Objects",
                "FAQs",
              ].map((tag) => (
                <div
                  key={tag}
                  className="px-3 h-7 rounded-lg flex justify-center items-center bg-[#F7F7F7] text-[#686868] font-urbanist text-[14px] font-medium"
                >
                  {tag}{" "}
                  <AddIcon className="fill-[#686868] w-4 h-4 rotate-45 ml-1 cursor-pointer" />
                </div>
              ))}
            </>

            <form>
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Add a tag"
                className="w-full outline-none placeholder:text-[#E9E9E9] font-urbanist font-medium"
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
