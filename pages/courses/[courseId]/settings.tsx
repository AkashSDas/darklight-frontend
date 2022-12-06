import { ReactElement } from "react";

import CourseEditorLayout from "../../../components/course-editor/layout";

function CourseSettingsPage() {
  return <div></div>;
}

CourseSettingsPage.getLayout = function getLayout(page: ReactElement) {
  return <CourseEditorLayout>{page}</CourseEditorLayout>;
};

export default CourseSettingsPage;
