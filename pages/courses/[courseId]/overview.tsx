import { ReactElement } from "react";

import CourseEditorLayout from "../../../components/course-editor/layout";

function OverviewPage() {
  return <div></div>;
}

OverviewPage.getLayout = function getLayout(page: ReactElement) {
  return <CourseEditorLayout>{page}</CourseEditorLayout>;
};

export default OverviewPage;
