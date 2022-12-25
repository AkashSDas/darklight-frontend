import { ReactElement } from "react";

import CourseEditorLayout from "@components/shared/course-editor-layout";

export default function CourseMembersPage(): JSX.Element {
  return (
    <div>
      <h1>Members included in the Course</h1>
    </div>
  );
}

CourseMembersPage.getLayout = function getLayout(page: ReactElement) {
  return <CourseEditorLayout context="course">{page}</CourseEditorLayout>;
};
