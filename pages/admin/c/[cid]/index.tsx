import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

import CourseEditorLayout from "@components/shared/course-editor-layout";
import EmojiPicker from "@components/shared/emoji-picker";
import { AddIcon, ArrowDownIcon } from "@components/shared/icons";
import { useAppDispatch, useAppSelector, useCourse, useDropdown, useResizeTextareaHeight, useSaveCourseSettings } from "@lib/hooks";
import { selectCourse, selectCourseData, updateCourse } from "@store/_course/slice";
import { deleteCourseThunk } from "@store/_course/thunk";

function TitleInput({ title }: { title: string }) {
  var dispatch = useAppDispatch();
  var course = useAppSelector(selectCourseData);
  var { ref } = useResizeTextareaHeight(title ?? "");

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
      value={title}
      onKeyDownCapture={(e) => {
        if (e.key == "Enter") e.preventDefault();
      }}
      placeholder="Untitled"
      className="w-full outline-none resize-none placeholder:text-[#E9E9E9] font-gilroy font-extrabold text-[39.1px] leading-[100%]"
    />
  );
}

function DescriptionInput({ description }: { description: string }) {
  var dispatch = useAppDispatch();
  var course = useAppSelector(selectCourseData);
  var { ref } = useResizeTextareaHeight(description ?? "");

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
      value={description}
      onKeyDownCapture={(e) => {
        if (e.key == "Enter") e.preventDefault();
      }}
      placeholder="Add a description"
      className="w-full outline-none resize-none placeholder:text-[#E9E9E9] font-urbanist font-medium"
    />
  );
}

export default function CoursePage() {
  var { loading, course, courseId } = useCourse();

  if (loading || !courseId || !course) {
    return <div>Loading...</div>;
  }

  return <CourseSettings />;
}

function CourseSettings() {
  var dispatch = useAppDispatch();
  var { isOpen, setIsOpen, wrapperRef } = useDropdown();
  var { loading, course } = useAppSelector(selectCourse);
  useSaveCourseSettings();

  function EmojiInput() {
    return (
      <div
        onClick={() => setIsOpen(true)}
        ref={wrapperRef}
        className="relative mb-3 w-[50px] h-[50px]"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="flex justify-center items-center w-[50px] h-[50px] text-[50px] cursor-pointer hover:bg-gray-100 rounded-lg font-urbanist"
        >
          {course.emoji ?? "✌🏼"}
        </div>
        {isOpen && (
          <div className="top-[50px] absolute z-20 bg-slate-100">
            <EmojiPicker
              onSelect={(emoji) => {
                dispatch(
                  updateCourse({
                    ...course,
                    emoji: emoji.native,
                    lastEditedOn: new Date(Date.now()).toISOString(),
                  })
                );
                setIsOpen(false);
              }}
              handleClose={() => setIsOpen(false)}
            />
          </div>
        )}
      </div>
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
        <TitleInput title={course.title} />
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
  var dispatch = useAppDispatch();
  var router = useRouter();

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
          onClick={async () => {
            var res = await (await dispatch(deleteCourseThunk())).payload;
            if (res) router.push("/");
          }}
          className="h-11 px-6 rounded-2xl bg-[#FFECEB] text-[#EA4335]"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function PublishInput({ id, stage }) {
  var [active, setActive] = useState(stage == "draft" ? false : true);
  var dispatch = useAppDispatch();
  var course = useAppSelector(selectCourseData);

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
          onClick={() => {
            setActive(!active);
            dispatch(
              updateCourse({
                ...course,
                stage: stage == "draft" ? "published" : "draft",
                lastEditedOn: new Date(Date.now()).toISOString(),
              })
            );
          }}
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
  var dispatch = useAppDispatch();
  var course = useAppSelector(selectCourseData);

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
            value={price ?? ""}
            type="number"
            autoComplete="off"
            min={0}
            placeholder="₹"
            onChange={(e) => {
              dispatch(
                updateCourse({
                  ...course,
                  price: e.target.value == "" ? null : Number(e.target.value),
                  lastEditedOn: new Date(Date.now()).toISOString(),
                })
              );
            }}
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
  var dispatch = useAppDispatch();
  var course = useAppSelector(selectCourseData);

  return (
    <div className="flex justify-between gap-1">
      <div className="flex flex-col gap-2">
        <div className="font-urbanist font-bold">Difficulty</div>
        <div className="font-urbanist font-medium text-[#686868] text-[14px]">
          Who is your target audience?
        </div>
      </div>

      <div
        ref={wrapperRef}
        className="relative max-w-[300px] w-full flex justify-end"
      >
        <div
          className="w-[180px] rounded-2xl h-11 border border-solid border-[#E9E9E9] flex gap-2 items-center cursor-pointer p-[6px]"
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
                  onClick={(e) => {
                    setIsOpen(false);
                    dispatch(
                      updateCourse({
                        ...course,
                        difficulty: difficulty as any,
                        lastEditedOn: new Date(Date.now()).toISOString(),
                      })
                    );
                  }}
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

function TagsInput({ id, tags }) {
  var { isOpen, setIsOpen, wrapperRef } = useDropdown();
  var [value, setValue] = useState("");
  var course = useAppSelector(selectCourseData);
  var dispatch = useAppDispatch();

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
          {tags.map((tag) => (
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
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="px-3 h-7 rounded-lg flex justify-center items-center bg-[#F7F7F7] text-[#686868] font-urbanist text-[14px] font-medium"
                >
                  {tag}{" "}
                  <AddIcon
                    onClick={() => {
                      dispatch(
                        updateCourse({
                          ...course,
                          tags: course.tags.filter((t) => t != tag),
                          lastEditedOn: new Date(Date.now()).toISOString(),
                        })
                      );
                    }}
                    className="fill-[#686868] w-4 h-4 rotate-45 ml-1 cursor-pointer"
                  />
                </div>
              ))}
            </>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(
                  updateCourse({
                    ...course,
                    tags: [...course.tags, value],
                    lastEditedOn: new Date(Date.now()).toISOString(),
                  })
                );
                setValue("");
              }}
            >
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

CoursePage.getLayout = function getLayout(page) {
  return <CourseEditorLayout>{page}</CourseEditorLayout>;
};
