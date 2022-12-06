import { ReactElement } from "react";

import CourseEditorLayout from "../../../components/course-editor/layout";

function PreviewPage() {
  return <div></div>;
}

PreviewPage.getLayout = function getLayout(page: ReactElement) {
  return <CourseEditorLayout>{page}</CourseEditorLayout>;
};

export default PreviewPage;
