import { ReactElement } from "react";

import CourseEditorLayout from "@components/shared/course-editor-layout";

export default function EditLessonPage(): JSX.Element {
  return (
    <div>
      <h1>Edit Lesson</h1>
    </div>
  );
}

EditLessonPage.getLayout = function getLayout(page: ReactElement) {
  return <CourseEditorLayout context="course">{page}</CourseEditorLayout>;
};
