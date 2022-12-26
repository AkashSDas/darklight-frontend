import { ReactElement } from "react";

import CourseBanner from "@components/course-editor-settings/course-banner";
import CourseDescriptionInput from "@components/course-editor-settings/course-description-input";
import CourseDifficultySetting from "@components/course-editor-settings/course-difficulty-setting";
import CoursePriceInputSetting from "@components/course-editor-settings/course-price-input-setting";
import CourseTagsSetting from "@components/course-editor-settings/course-tags-settings";
import CourseTitleInput from "@components/course-editor-settings/course-title-input";
import DeleteCourseSetting from "@components/course-editor-settings/delete-course-setting";
import PublishCourseSetting from "@components/course-editor-settings/publish-course-setting";
import CourseEditorLayout from "@components/shared/course-editor-layout";

export default function CourseSettingsPage(): JSX.Element {
  function Divider(): JSX.Element {
    return <hr className="my-4 bg-border opacity-50 w-full" />;
  }

  return (
    <main className="w-full flex flex-col gap-2 items-center">
      <div className="w-full max-w-[800px] flex flex-col gap-2 items-center">
        <CourseBanner />
        <CourseTitleInput />
        <CourseDescriptionInput />
        <Divider />
        <CourseTagsSetting />
        <Divider />
        <CourseDifficultySetting />
        <Divider />
        <CoursePriceInputSetting />
        <Divider />
        <PublishCourseSetting />
        <Divider />
        <DeleteCourseSetting />
      </div>
    </main>
  );
}

CourseSettingsPage.getLayout = function getLayout(page: ReactElement) {
  return <CourseEditorLayout context="course">{page}</CourseEditorLayout>;
};
