import { ReactElement } from "react";

import CourseEditorLayout from "../../../../components/course-editor/layout";

export default function GroupPage() {
  return <div></div>;
}

GroupPage.getLayout = function getLayout(page: ReactElement) {
  return <CourseEditorLayout>{page}</CourseEditorLayout>;
};
