import { ReactElement } from "react";

import CourseEditorLayout from "../../../../../../components/course-editor/layout";

export default function LessonPage() {
  return <div></div>;
}

LessonPage.getLayout = function getLayout(page: ReactElement) {
  return <CourseEditorLayout>{page}</CourseEditorLayout>;
};
