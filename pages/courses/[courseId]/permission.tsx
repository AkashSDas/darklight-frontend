import { ReactElement } from "react";

import CourseEditorLayout from "@components/shared/course-editor-layout";

export default function CoursePremissionPage(): JSX.Element {
  return (
    <div>
      <h1>Course Permissions</h1>
    </div>
  );
}

CoursePremissionPage.getLayout = function getLayout(page: ReactElement) {
  return <CourseEditorLayout context="course">{page}</CourseEditorLayout>;
};
