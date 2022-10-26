import debounce from "lodash.debounce";
import { useRouter } from "next/router";
import { ReactElement, useCallback } from "react";

import CourseDifficultyDropdown from "@components/edit-course/difficulty-dropdown";
import CoursePriceInput from "@components/edit-course/price-input";
import PublishCourseInput from "@components/edit-course/publish-input";
import CourseTagsInput from "@components/edit-course/tags-input";
import Divider from "@components/editor/divider";
import Text from "@components/editor/text";
import CourseEditorLayout from "@components/layout/course-editor";
import { useAppDispatch, useAppSelector } from "@hooks/store";
import { selectEditableCourse, setCourse } from "@store/editable-course/slice";
import { updateCourseInfoThunk } from "@store/editable-course/thunk";

function EditableCoursePage({}) {
  var router = useRouter();
  var dispatch = useAppDispatch();
  var { course, isLoading } = useAppSelector(selectEditableCourse);

  // eslint-disable-next-line
  var titleCallback = useCallback(
    debounce(async function updateTitle(value) {
      if (value && course?.id) {
        await dispatch(
          updateCourseInfoThunk({
            courseId: course?.id,
            payload: { title: value },
          })
        );
      }
    }, 1000),
    [course?.id, dispatch]
  );

  // eslint-disable-next-line
  var descriptionCallback = useCallback(
    debounce(async function updateCourseTitle(value) {
      if (value && course?.id) {
        await dispatch(
          updateCourseInfoThunk({
            courseId: course?.id,
            payload: { description: value },
          })
        );
      }
    }, 1000),
    []
  );

  async function handleTitleOnChange(value: string) {
    dispatch(setCourse({ ...course, title: value }));
    await titleCallback(value);
  }

  async function handleDescriptionOnChange(value: string) {
    dispatch(setCourse({ ...course, description: value }));
    await descriptionCallback(value);
  }

  if (!router.query?.id || isLoading) return <div>Loading...</div>;

  return (
    <div className="ml-[240px] mt-4 flex flex-col justify-center items-center">
      <main className="w-full flex flex-col py-2 px-[96px] max-w-[900px]">
        <Text
          size="h2"
          text={course?.title}
          placeholder="Untitled"
          onChange={handleTitleOnChange}
        />
        <div className="w-full h-[6px]"></div>
        <Text
          size="intro"
          text={course?.description}
          placeholder="Add a description"
          onChange={handleDescriptionOnChange}
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
            <CourseTagsInput />
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
            <CourseDifficultyDropdown />
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

EditableCoursePage.getLayout = function getLayout(page: ReactElement) {
  return <CourseEditorLayout>{page}</CourseEditorLayout>;
};

export default EditableCoursePage;
