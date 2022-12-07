import { useFormik } from "formik";
import debounce from "lodash.debounce";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactElement, useCallback, useReducer, useRef, useState } from "react";
import { useSWRConfig } from "swr";

import { TextBadge } from "../../../components/badges";
import CourseEditorLayout from "../../../components/course-editor/layout";
import Banner from "../../../components/course-settings/banner";
import DeleteCourse from "../../../components/course-settings/delete-course";
import DescriptionInput from "../../../components/course-settings/description";
import DifficultyLevelInput from "../../../components/course-settings/difficulty-input";
import CourseTags from "../../../components/course-settings/tags-input";
import TitleInput from "../../../components/course-settings/title";
import EmojiPicker from "../../../components/emoji/picker";
import { CameraIcon } from "../../../components/icons";
import { AddIcon } from "../../../components/icons/add";
import { DescriptionIcon } from "../../../components/icons/description";
import { useDropdown, useEditableCourse, useResizeTextareaHeight, useUser } from "../../../lib/hooks.lib";
import { updateCourseSettings } from "../../../services/course.service";

function CourseSettingsPage() {
  var { loading, course, error } = useEditableCourse();

  if (loading) return <div>Loading...</div>;

  return (
    <main className="mt-4 w-full flex flex-col gap-2 items-center">
      <section className="w-full max-w-[800px] flex flex-col items-center gap-2">
        <Banner />
        <TitleInput />
        <DescriptionInput />
        <hr className="my-4 bg-border opacity-50 w-full" />
        <CourseTags />
        <hr className="my-4 bg-border opacity-50 w-full" />
        <DifficultyLevelInput />
        <hr className="my-4 bg-border opacity-50 w-full" />
        <DeleteCourse />
      </section>
    </main>
  );
}

CourseSettingsPage.getLayout = function getLayout(page: ReactElement) {
  return <CourseEditorLayout>{page}</CourseEditorLayout>;
};

export default CourseSettingsPage;
