import { ReactElement } from "react";

import Banner from "@components/course-editor-settings/banner";
import DeleteCourseSetting from "@components/course-editor-settings/delete-course-setting";
import DescriptionInput from "@components/course-editor-settings/description-input";
import TitleInput from "@components/course-editor-settings/title-input";
import CourseEditorLayout from "@components/shared/course-editor-layout";

export default function CourseSettingsPage(): JSX.Element {
  function Divider(): JSX.Element {
    return <hr className="my-4 bg-border opacity-50 w-full" />;
  }

  return (
    <main className="w-full flex flex-col gap-2 items-center">
      <div className="w-full max-w-[800px] flex flex-col gap-2 items-center">
        <Banner />
        <TitleInput />
        <DescriptionInput />
        <Divider />
        <DeleteCourseSetting />
      </div>
    </main>
  );
}

CourseSettingsPage.getLayout = function getLayout(page: ReactElement) {
  return <CourseEditorLayout context="course">{page}</CourseEditorLayout>;
};
