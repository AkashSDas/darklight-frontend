import { ReactElement } from "react";

import CourseEditorLayout from "@components/shared/course-editor-layout";

export default function PreviewCoursePage(): JSX.Element {
  return (
    <div>
      <h1>Preview Course</h1>
    </div>
  );
}

PreviewCoursePage.getLayout = function getLayout(page: ReactElement) {
  return <CourseEditorLayout context="course">{page}</CourseEditorLayout>;
};
