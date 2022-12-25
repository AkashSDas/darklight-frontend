import { ReactElement } from "react";

import CourseEditorLayout from "@components/shared/course-editor-layout";

export default function GroupSettingsPage(): JSX.Element {
  function Divider(): JSX.Element {
    return <hr className="my-4 bg-border opacity-50 w-full" />;
  }

  return (
    <main className="w-full flex flex-col gap-2 items-center">
      <div className="w-full max-w-[800px] flex flex-col gap-2 items-center"></div>
    </main>
  );
}

GroupSettingsPage.getLayout = function getLayout(page: ReactElement) {
  return <CourseEditorLayout context="course">{page}</CourseEditorLayout>;
};
