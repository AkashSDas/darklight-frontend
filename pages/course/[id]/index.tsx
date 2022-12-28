import { ReactElement } from "react";

import About from "@components/buy-course/about";
import Banner from "@components/buy-course/banner";
import CourseMetadata from "@components/buy-course/course-metadata";
import DynamicHeader from "@components/buy-course/dynamic-header";
import Instructors from "@components/buy-course/instructors";
import Lessons from "@components/buy-course/lessons";
import BaseLayout from "@components/shared/base-layout";
import { useBuyCourse } from "@lib/hooks.lib";

export default function CourseBuyPage(): JSX.Element {
  var { loading } = useBuyCourse();

  return (
    <div className="px-8 font-urbanist font-medium">
      {loading ? <div>Loading...</div> : <DisplayCourse />}
    </div>
  );
}

function DisplayCourse(): JSX.Element {
  function Divider(): JSX.Element {
    return <hr className="bg-border h-[1px] w-full my-4" />;
  }

  return (
    <main className="mx-8 flex justify-between">
      <div className="w-full max-w-[800px] flex flex-col gap-3">
        <DynamicHeader />
        <Banner />
        <CourseMetadata />
        <Divider />

        {/* Content Tabbar */}
        <div className="flex gap-3 items-center">
          <div className="px-5 h-11 flex justify-center items-center cursor-pointer rounded-2xl hover:bg-background3 active:bg-border">
            About
          </div>
          <div className="px-5 h-11 flex justify-center items-center cursor-pointer rounded-2xl hover:bg-background3 active:bg-border">
            Instructors
          </div>
          <div className="px-5 h-11 flex justify-center items-center cursor-pointer rounded-2xl hover:bg-background3 active:bg-border">
            Syllabus
          </div>
          <div className="px-5 h-11 flex justify-center items-center cursor-pointer rounded-2xl hover:bg-background3 active:bg-border">
            FAQs
          </div>
        </div>

        <Divider />
        <About />
        <Divider />
        <Instructors />
        <Divider />
        <Lessons />
      </div>
    </main>
  );
}

CourseBuyPage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
