import { ReactElement } from "react";

import CourseEditorLayout from "../../../components/course-editor/layout";

function PermissionPage() {
  return <div></div>;
}

PermissionPage.getLayout = function getLayout(page: ReactElement) {
  return <CourseEditorLayout>{page}</CourseEditorLayout>;
};

export default PermissionPage;
