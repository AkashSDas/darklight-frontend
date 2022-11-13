import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";

import CourseEditorLayout from "@components/shared/course-editor-layout";
import EmojiPicker from "@components/shared/emoji-picker";
import { AddIcon, ArrowDownIcon } from "@components/shared/icons";
import SwitchButton from "@components/shared/switch-button";
import { useAppDispatch, useAppSelector, useCourse, useDropdown, useResizeTextareaHeight, useSaveCourseSettings } from "@lib/hooks";
import { Course, selectCourse, selectCourseData, updateCourse } from "@store/_course/slice";
import { deleteCourseThunk } from "@store/_course/thunk";

export default function CoursePage() {
  var { loading, course, courseId } = useCourse();

  if (loading || !courseId || !course) {
    return <div>Loading...</div>;
  }

  return <CourseSettings />;
}

CoursePage.getLayout = function getLayout(page) {
  return <CourseEditorLayout>{page}</CourseEditorLayout>;
};

// ==================================
// Course inputs
// ==================================

function TitleInput() {
  var course = useAppSelector(selectCourseData);
  var { ref } = useResizeTextareaHeight(course.title ?? "");
  var dispatch = useAppDispatch();

  return (
    <textarea
      ref={ref}
      onChange={(e) =>
        dispatch(
          updateCourse({
            ...course,
            title: e.target.value,
            lastEditedOn: new Date(Date.now()).toISOString(),
          })
        )
      }
      value={course.title ?? ""}
      onKeyDownCapture={(e) => {
        if (e.key == "Enter") e.preventDefault();
      }}
      placeholder="Untitled"
      className="w-full outline-none resize-none placeholder:text-[#E9E9E9] font-gilroy font-extrabold text-[39.1px] leading-[100%]"
    />
  );
}

function DescriptionInput() {
  var course = useAppSelector(selectCourseData);
  var { ref } = useResizeTextareaHeight(course.description ?? "");
  var dispatch = useAppDispatch();

  return (
    <textarea
      ref={ref}
      onChange={(e) => {
        dispatch(
          updateCourse({
            ...course,
            description: e.target.value,
            lastEditedOn: new Date(Date.now()).toISOString(),
          })
        );
      }}
      value={course.description ?? ""}
      onKeyDownCapture={(e) => {
        if (e.key == "Enter") e.preventDefault();
      }}
      placeholder="Add a description"
      className="w-full outline-none resize-none placeholder:text-[#E9E9E9] font-urbanist font-medium"
    />
  );
}

function EmojiInput() {
  var { isOpen, setIsOpen, wrapperRef } = useDropdown();
  var { course } = useAppSelector(selectCourse);
  var dispatch = useAppDispatch();

  function onEmojiSelect(emoji: any) {
    dispatch(
      updateCourse({
        ...course,
        emoji: emoji.native,
        lastEditedOn: new Date(Date.now()).toISOString(),
      })
    );
    setIsOpen(false);
  }

  return (
    <div
      onClick={() => setIsOpen(true)}
      ref={wrapperRef}
      className="relative mb-3 w-[50px] h-[50px]"
    >
      {/* Emoji button */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="flex justify-center items-center w-[50px] h-[50px] text-[50px] cursor-pointer hover:bg-gray-100 rounded-lg font-urbanist"
      >
        {course.emoji ?? "✌🏼"}
      </div>

      {/* Emoji picker */}
      {isOpen && (
        <div className="top-[50px] absolute z-20 bg-slate-100">
          <EmojiPicker
            onSelect={onEmojiSelect}
            handleClose={() => setIsOpen(false)}
          />
        </div>
      )}
    </div>
  );
}

// ==================================
// Settings
// ==================================

function CourseSettings() {
  var { loading, course } = useAppSelector(selectCourse);
  useSaveCourseSettings();

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
        <TitleInput />
        <DescriptionInput />

        <div className="mt-4 flex flex-col gap-4">
          <Divider />
          <TagsInput />
          <Divider />
          <DifficultInput />
          <Divider />
          <PriceInput />
          <Divider />
          <PublishInput />
          <Divider />
          <DeleteCourse />
        </div>
      </div>
    </div>
  );
}

/** It deletes the course that is being edited */
function DeleteCourse() {
  var router = useRouter();
  var dispatch = useAppDispatch();

  async function deleteCourse() {
    var res = await (await dispatch(deleteCourseThunk())).payload;
    if (res) router.push("/");
  }

  return (
    <div className="flex justify-between gap-1">
      <div className="flex flex-col gap-2">
        <div className="font-urbanist font-bold">Delete</div>
        <div className="font-urbanist font-medium text-[#686868] text-[14px]">
          Irreversilble action!
        </div>
      </div>

      {/* Delete course button */}
      <div className="relative max-w-[300px] w-full flex justify-end">
        <button
          onClick={deleteCourse}
          className="h-11 px-6 rounded-2xl bg-[#FFECEB] text-[#EA4335]"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function PublishInput() {
  var { course } = useAppSelector(selectCourse);
  var dispatch = useAppDispatch();

  function togglePublish() {
    dispatch(
      updateCourse({
        ...course,
        stage: course.stage == "draft" ? "published" : "draft",
        lastEditedOn: new Date(Date.now()).toISOString(),
      })
    );
  }

  return (
    <div className="flex justify-between gap-1">
      <div className="flex flex-col gap-2">
        <div className="font-urbanist font-bold">Publish</div>
        <div className="font-urbanist font-medium text-[#686868] text-[14px]">
          Make it public for other to see and purchase
        </div>
      </div>

      <SwitchButton
        checked={course.stage == "draft" ? false : true}
        onChange={togglePublish}
      />
    </div>
  );
}

function PriceInput() {
  var course = useAppSelector(selectCourseData);
  var dispatch = useAppDispatch();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch(
      updateCourse({
        ...course,
        price: e.target.value == "" ? null : Number(e.target.value),
        lastEditedOn: new Date(Date.now()).toISOString(),
      })
    );
  }

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
            value={course.price ?? ""}
            type="number"
            autoComplete="off"
            min={0}
            placeholder="₹"
            onChange={handleChange}
            className="w-full outline-none flex-grow font-urbanist"
          />

          <div className="h-6 w-6 flex justify-center items-center rounded-md">
            💰
          </div>
        </div>
      </div>
    </div>
  );
}

function DifficultInput() {
  var { isOpen, setIsOpen, wrapperRef } = useDropdown();
  var course = useAppSelector(selectCourseData);
  var dispatch = useAppDispatch();

  function updateDifficulty(difficulty: Course["difficulty"]) {
    setIsOpen(false);
    dispatch(
      updateCourse({
        ...course,
        difficulty: difficulty as any,
        lastEditedOn: new Date(Date.now()).toISOString(),
      })
    );
  }

  function DifficultyEmoji({
    difficulty,
  }: {
    difficulty: Course["difficulty"];
  }) {
    if (difficulty == "beginner") var emoji = "👶";
    else if (difficulty == "intermediate") var emoji = "👱‍♀️";
    else if (difficulty == "advanced") var emoji = "👵";
    else var emoji = "🥸";

    return (
      <span className="w-5 h-5 flex justify-center items-center">{emoji}</span>
    );
  }

  function DifficultyLabel({
    difficulty,
  }: {
    difficulty: Course["difficulty"];
  }) {
    if (difficulty == "beginner") var label = "Beginner";
    else if (difficulty == "intermediate") var label = "Intermediate";
    else if (difficulty == "advanced") var label = "Advanced";
    else var label = "Beginner";

    return (
      <span className="text-[#686868] font-semibold font-urbanist flex-grow">
        {label}
      </span>
    );
  }

  return (
    <div className="flex justify-between gap-1">
      <div className="flex flex-col gap-2">
        <div className="font-urbanist font-bold">Difficulty</div>
        <div className="font-urbanist font-medium text-[#686868] text-[14px]">
          Who is your target audience?
        </div>
      </div>

      {/* Input */}
      <div
        ref={wrapperRef}
        className="relative max-w-[300px] w-full flex justify-end"
      >
        {/* Current difficulty */}
        <div
          className="w-[180px] rounded-2xl h-11 border border-solid border-[#E9E9E9] flex gap-2 items-center cursor-pointer p-[6px]"
          onClick={() => setIsOpen(true)}
        >
          <DifficultyEmoji difficulty={course.difficulty} />
          <DifficultyLabel difficulty={course.difficulty} />
          <span>
            <ArrowDownIcon className="h-6 w-6 stroke-[#686868]" />
          </span>
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className="z-10 absolute top-0 right-0 w-[180px] px-2 py-3 rounded-xl bg-white border border-solid border-gray-100 shadow-lg flex flex-wrap gap-[6px]">
            <div className="w-full">
              {["beginner", "intermediate", "advanced"].map((difficulty) => (
                <div
                  key={difficulty}
                  onClick={() => updateDifficulty(difficulty as any)}
                  className="h-7 w-full px-[2px] flex items-center rounded-lg gap-1 cursor-pointer hover:bg-gray-100"
                >
                  <DifficultyEmoji difficulty={difficulty as any} />
                  <DifficultyLabel difficulty={difficulty as any} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TagsInput() {
  var { isOpen, setIsOpen, wrapperRef } = useDropdown();
  var [value, setValue] = useState("");
  var course = useAppSelector(selectCourseData);
  var dispatch = useAppDispatch();
  var tags = course.tags;

  function removeTag(tag: string) {
    dispatch(
      updateCourse({
        ...course,
        tags: course.tags.filter((t) => t != tag),
        lastEditedOn: new Date(Date.now()).toISOString(),
      })
    );
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Add tag
    dispatch(
      updateCourse({
        ...course,
        tags: [...course.tags, value],
        lastEditedOn: new Date(Date.now()).toISOString(),
      })
    );

    setValue("");
  }

  return (
    <div className="flex justify-between gap-1">
      <div className="flex flex-col gap-2">
        <div className="font-urbanist font-bold">Tags</div>
        <div className="font-urbanist font-medium text-[#686868] text-[14px]">
          Use tags to rank your course higher
        </div>
      </div>

      {/* Dropdown input  */}
      <div
        ref={wrapperRef}
        onClick={() => setIsOpen(true)}
        className="relative max-w-[300px] w-full rounded-lg hover:bg-gray-50"
      >
        {/* Display tags */}
        <div className="flex flex-wrap gap-[6px] justify-end cursor-pointer p-1">
          {tags.map((tag) => (
            <div
              key={tag}
              className="px-3 h-7 rounded-lg flex justify-center items-center bg-[#E1E4FF] text-[#3A4EFF] font-urbanist text-[14px] font-medium"
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className="z-10 absolute top-0 right-0 w-full px-2 py-3 rounded-xl bg-white border border-solid border-gray-100 shadow-lg flex flex-wrap gap-[6px]">
            <>
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="px-3 h-7 rounded-lg flex justify-center items-center bg-[#F7F7F7] text-[#686868] font-urbanist text-[14px] font-medium"
                >
                  {tag}{" "}
                  <AddIcon
                    onClick={() => removeTag(tag)}
                    className="fill-[#686868] w-4 h-4 rotate-45 ml-1 cursor-pointer"
                  />
                </div>
              ))}
            </>

            {/* Add tag input */}
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                autoFocus
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
