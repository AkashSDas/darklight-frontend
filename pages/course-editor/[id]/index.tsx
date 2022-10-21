import { useFormik } from "formik";
import moment from "moment-timezone";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";

import IconButton from "@components/buttons/icon-button";
import TextButton from "@components/buttons/text-button";
import OptionsInput from "@components/dropdown/options-input";
import Divider from "@components/editor/divider";
import Spacer from "@components/editor/space";
import Text from "@components/editor/text";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  MenuIcon,
  MultiplyIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
} from "@components/icons";
import { useOutsideAlerter } from "@hooks/outsider-alerter";
import { useAppDispatch, useAppSelector } from "@hooks/store";
import {
  addTag,
  removeTag,
  selectEditableCourse,
} from "@store/editable-course/slice";
import {
  createCourseModuleThunk,
  getCourseThunk,
  updateCourseInfoThunk,
} from "@store/editable-course/thunk";
import CourseEditorLayout from "@components/layout/course-editor";

function EditableCoursePage({}) {
  var [isLoading, setIsLoading] = useState(true);
  var router = useRouter();
  var dispatch = useAppDispatch();
  var { course, isLoading: courseLoading } =
    useAppSelector(selectEditableCourse);

  useEffect(() => {
    if (router.query?.id) setIsLoading(false);
  }, [router.query]);

  if (isLoading || courseLoading) return <div>Loading...</div>;

  return (
    <div className="ml-[240px] mt-4 flex flex-col justify-center items-center">
      <main className="w-full flex flex-col py-2 px-[96px] max-w-[900px]">
        <Text
          size="h2"
          text={course?.title}
          placeholder="Untitled"
          onChange={async (value) => {
            if (value && value.length >= 6) {
              await dispatch(
                updateCourseInfoThunk({
                  courseId: course?.id,
                  payload: { title: value },
                })
              );
            }
          }}
        />
        <div className="w-full h-[6px]"></div>
        <Text
          size="intro"
          text={course?.description}
          placeholder="Add a description"
          onChange={async (value) => {
            if (value && value.length >= 6) {
              await dispatch(
                updateCourseInfoThunk({
                  courseId: course?.id,
                  payload: { description: value },
                })
              );
            }
          }}
        />
        <div className="w-full h-8"></div>
        <div>
          <div className="-text-intro mb-1">Settings</div>
          <Divider height={1} />
          <div className="w-full h-3"></div>
          <SettingItem
            title="Tags"
            description="Explain your course using tags"
          >
            <CourseTagsOptionsInput />
          </SettingItem>
          <div className="w-full h-4"></div>
          <SettingItem title="Price" description="How much to charge students">
            <CoursePriceInput />
          </SettingItem>
          <div className="w-full h-4"></div>
          <SettingItem
            title="Difficulty level"
            description="What is the difficulty level of this course"
          >
            <CourseDifficultyOptionsInput />
          </SettingItem>
          <div className="w-full h-4"></div>
          <SettingItem
            title="Publish"
            description="Publish your course for people to see"
          >
            <PublishCourseInput />
          </SettingItem>
        </div>
      </main>
    </div>
  );
}

function PublishCourseInput() {
  var { course } = useAppSelector(selectEditableCourse);
  var [active, setActive] = useState(course?.stage == "published" ?? false);
  var dispatch = useAppDispatch();
  useEffect(() => {
    setActive(course?.stage == "published" ?? false);
  }, [course?.stage]);

  return (
    <div
      className="flex justify-between items-center cursor-pointer"
      onClick={async () => {
        setActive(!active);
        await dispatch(
          updateCourseInfoThunk({
            courseId: course?.id,
            payload: { stage: !active ? "published" : "draft" },
          })
        );
      }}
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
  );
}

function SettingItem({ children, title, description }) {
  return (
    <div className="flex gap-2 items-center">
      <div className="flex flex-col flex-grow">
        <div className="-text-body2 text-grey7">{title}</div>
        <div className="-text-cap text-grey6">{description}</div>
      </div>

      <div className="w-[300px]">{children}</div>
    </div>
  );
}

function CoursePriceInput() {
  var { course } = useAppSelector(selectEditableCourse);
  var dispatch = useAppDispatch();
  var formik = useFormik({
    initialValues: { price: course?.price },
    onSubmit: async (values) => {
      await dispatch(
        updateCourseInfoThunk({
          courseId: course?.id,
          payload: { price: values.price },
        })
      );
    },
  });

  useEffect(() => {
    formik.setFieldValue("price", course?.price);
  }, [course?.price]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        className="w-full px-3 py-2 border border-grey3 rounded-md text-grey8"
        name="price"
        type="number"
        placeholder="₹0"
        autoComplete="off"
        value={formik.values.price}
        onChange={formik.handleChange}
        min={0}
      />
    </form>
  );
}

function CourseTagsOptionsInput() {
  var { course } = useAppSelector(selectEditableCourse);
  var dispatch = useAppDispatch();
  var wrapperRef = useRef(null);
  var [isOpen, setIsOpen] = useState(false);
  useOutsideAlerter(wrapperRef, function updateDropdownOnOutsideClick() {
    setIsOpen(false);
  });

  return (
    <div
      ref={wrapperRef}
      onClick={() => setIsOpen(true)}
      className="relative w-[300px] p-1 rounded-md min-h-[44px] bg-grey0 cursor-pointer hover:bg-grey1 active:bg-grey2 flex flex-wrap gap-1"
    >
      {(course?.tags ?? [])
        .map((t) => ({
          value: t,
          id: nanoid(),
        }))
        .map((t) => (
          <span
            key={t.id}
            className="h-7 w-max rounded-[4px] flex-shrink px-[6px] py-1 flex items-center bg-grey2 min-w-0"
          >
            <div className="flex-shrink text-[14px] text-grey7 whitespace-nowrap overflow-hidden text-ellipsis">
              {t.value}
            </div>
          </span>
        ))}

      {isOpen && (
        <OptionsInput
          opts={course?.tags ?? []}
          handleAdd={(v) => addTag(v)}
          handleRemove={(v) => removeTag(v)}
          onUnmount={async (values) =>
            await dispatch(
              updateCourseInfoThunk({
                courseId: course?.id,
                payload: { tags: values },
              })
            )
          }
        />
      )}
    </div>
  );
}

function CourseDifficultyOptionsInput() {
  var { course } = useAppSelector(selectEditableCourse);
  var dispatch = useAppDispatch();
  var wrapperRef = useRef(null);
  var [isOpen, setIsOpen] = useState(false);
  useOutsideAlerter(wrapperRef, function updateDropdownOnOutsideClick() {
    setIsOpen(false);
  });

  return (
    <div
      ref={wrapperRef}
      className="relative w-[300px] p-1 rounded-md min-h-[44px] flex flex-wrap gap-1"
    >
      {course?.difficulty && (
        <span
          onClick={() => setIsOpen(true)}
          className="flex gap-2 items-center cursor-pointer h-8 rounded-[4px] px-[6px] py-1 bg-grey0 hover:bg-grey2 active:bg-grey3"
        >
          <div className="-text-body1 text-grey7 ">{course?.difficulty}</div>
          <div className="w-6 h-6">
            <ArrowDownIcon className="stroke-grey7" />
          </div>
        </span>
      )}

      {isOpen && (
        <div className="z-10 w-[300px] absolute top-0 left-0 shadow-lg rounded-md">
          <div className="flex flex-col max-w-[calc(-24px+100vw)] min-w-[180px] h-full max-h-[70vh">
            <div className="rounded-md flex flex-col flex-wrap p-1 gap-1 bg-grey1 flex-shrink-0 max-h-[240px] overflow-x-hidden overflow-y-auto">
              {["beginner", "intermediate", "advanced"].map((difficulty) => (
                <div
                  key={difficulty}
                  onClick={async () => {
                    if (course?.difficulty != difficulty) {
                      await dispatch(
                        updateCourseInfoThunk({
                          courseId: course?.id,
                          payload: { difficulty } as any,
                        })
                      );
                    }
                    setIsOpen(false);
                  }}
                  className={`${
                    course?.difficulty == difficulty ? "bg-grey2" : ""
                  } cursor-pointer active:bg-grey3 rounded-[4px] flex-shrink px-[6px] py-1 flex items-center hover:bg-grey2 min-w-0`}
                >
                  <div
                    className={` flex-shrink -text-body2 text-grey7 whitespace-nowrap overflow-hidden text-ellipsis`}
                  >
                    {difficulty}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

EditableCoursePage.getLayout = function getLayout(page: ReactElement) {
  return <CourseEditorLayout>{page}</CourseEditorLayout>;
};

export default EditableCoursePage;
