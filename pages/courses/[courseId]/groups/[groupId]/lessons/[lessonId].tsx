import { ReactElement } from "react";

import CourseEditorLayout from "@components/course-editor/layout";
import { useEditableLesson } from "@lib/hooks.lib";

export default function LessonPage() {
  var { loading, lesson } = useEditableLesson();

  if (loading) return <div>Loading...</div>;

  return <div>{JSON.stringify(lesson)}</div>;
}

LessonPage.getLayout = function getLayout(page: ReactElement) {
  return <CourseEditorLayout>{page}</CourseEditorLayout>;
};
