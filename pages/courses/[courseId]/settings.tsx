import { useFormik } from "formik";
import debounce from "lodash.debounce";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactElement, useCallback, useReducer, useRef, useState } from "react";
import { useSWRConfig } from "swr";

import CourseEditorLayout from "../../../components/course-editor/layout";
import Banner from "../../../components/course-settings/banner";
import DescriptionInput from "../../../components/course-settings/description";
import TitleInput from "../../../components/course-settings/title";
import { CameraIcon } from "../../../components/icons";
import { DescriptionIcon } from "../../../components/icons/description";
import { useEditableCourse, useResizeTextareaHeight, useUser } from "../../../lib/hooks.lib";
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
      </section>
    </main>
  );
}

CourseSettingsPage.getLayout = function getLayout(page: ReactElement) {
  return <CourseEditorLayout>{page}</CourseEditorLayout>;
};

export default CourseSettingsPage;
