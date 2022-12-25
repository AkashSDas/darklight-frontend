import { ReactElement } from "react";

import CourseEditorLayout from "@components/shared/course-editor-layout";

export default function CourseOverviewPage(): JSX.Element {
  return (
    <div>
      <h1>Course Overview</h1>
    </div>
  );
}

CourseOverviewPage.getLayout = function getLayout(page: ReactElement) {
  return <CourseEditorLayout context="course">{page}</CourseEditorLayout>;
};
