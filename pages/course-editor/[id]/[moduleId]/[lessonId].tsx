import { ReactElement } from "react";

import CourseEditorLayout from "@components/layout/course-editor";

function LessonPage({}) {
  return (
    <div>
      <h3>Lesson page</h3>
    </div>
  );
}

LessonPage.getLayout = function getLayout(page: ReactElement) {
  return <CourseEditorLayout>{page}</CourseEditorLayout>;
};

export default LessonPage;
