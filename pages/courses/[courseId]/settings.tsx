import { ReactElement } from "react";

import Banner from "@components/course-editor-settings/banner";
import CourseEditorLayout from "@components/shared/course-editor-layout";

export default function CourseSettingsPage(): JSX.Element {
  return (
    <main className="w-full flex flex-col gap-2 items-center">
      <div className="w-full max-w-[800px] flex flex-col gap-2 items-center">
        <Banner />
      </div>
    </main>
  );
}

CourseSettingsPage.getLayout = function getLayout(page: ReactElement) {
  return <CourseEditorLayout context="course">{page}</CourseEditorLayout>;
};
