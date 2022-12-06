import { ReactElement } from "react";

import CourseEditorLayout from "../../../components/course-editor/layout";

function BillingPage() {
  return <div></div>;
}

BillingPage.getLayout = function getLayout(page: ReactElement) {
  return <CourseEditorLayout>{page}</CourseEditorLayout>;
};

export default BillingPage;
