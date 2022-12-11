import { ReactElement } from "react";

import CourseEditorLayout from "../../../components/course-editor/layout";
import Banner from "../../../components/course-settings/banner";
import DeleteCourse from "../../../components/course-settings/delete-course";
import DescriptionInput from "../../../components/course-settings/description";
import DifficultyLevelInput from "../../../components/course-settings/difficulty-input";
import PriceInput from "../../../components/course-settings/price-input";
import PublishCourse from "../../../components/course-settings/publish-course";
import CourseTags from "../../../components/course-settings/tags-input";
import TitleInput from "../../../components/course-settings/title";
import { useEditableCourse } from "../../../lib/hooks.lib";

function CourseSettingsPage() {
  var { loading, course, error } = useEditableCourse();

  if (loading) return <div>Loading...</div>;

  return (
    <main className="mt-4 w-full flex flex-col gap-2 items-center">
      <section className="w-full max-w-[800px] flex flex-col items-center gap-2">
        <Banner />
        <TitleInput />
        <DescriptionInput />
        <hr className="my-4 bg-border opacity-50 w-full" />
        <CourseTags />
        <hr className="my-4 bg-border opacity-50 w-full" />
        <DifficultyLevelInput />
        <hr className="my-4 bg-border opacity-50 w-full" />
        <PriceInput />
        <hr className="my-4 bg-border opacity-50 w-full" />
        <PublishCourse />
        <hr className="my-4 bg-border opacity-50 w-full" />
        <DeleteCourse />

        <div className="my-8"></div>
      </section>
    </main>
  );
}

CourseSettingsPage.getLayout = function getLayout(page: ReactElement) {
  return <CourseEditorLayout>{page}</CourseEditorLayout>;
};

export default CourseSettingsPage;
