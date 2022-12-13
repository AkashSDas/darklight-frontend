import { Navbar } from "@components/bar/navbar";
import About from "@components/buy-course/about";
import Banner from "@components/buy-course/banner";
import DynamicHeader from "@components/buy-course/dynamic-header";
import Instructor from "@components/buy-course/instructor";
import Lessons from "@components/buy-course/lessons";
import Metadata from "@components/buy-course/metadata";
import { useBuyCourse } from "@lib/hooks.lib";

export default function CoursePage() {
  var { loading } = useBuyCourse();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <CourseView />
    </div>
  );
}

function CourseView() {
  return (
    <main className="flex justify-between mx-8 mt-4">
      <div className="w-full max-w-[800px] flex flex-col gap-3">
        <DynamicHeader />
        <Banner />
        <Metadata />

        <hr className="bg-border h-[1px] w-full my-4" />

        {/* Content Tabbar */}
        <div className="flex items-center gap-3">
          <div className="h-11 cursor-pointer rounded-2xl hover:bg-background3 active:bg-border px-5 flex justify-center items-center font-urbanist font-medium">
            About
          </div>
          <div className="h-11 cursor-pointer rounded-2xl hover:bg-background3 active:bg-border px-5 flex justify-center items-center font-urbanist font-medium">
            Instructors
          </div>
          <div className="h-11 cursor-pointer rounded-2xl hover:bg-background3 active:bg-border px-5 flex justify-center items-center font-urbanist font-medium">
            Syllabus
          </div>
          <div className="h-11 cursor-pointer rounded-2xl hover:bg-background3 active:bg-border px-5 flex justify-center items-center font-urbanist font-medium">
            FAQs
          </div>
        </div>

        <hr className="bg-border h-[1px] w-full my-4" />
        <About />
        <hr className="bg-border h-[1px] w-full my-8" />
        <Instructors />
        <hr className="bg-border h-[1px] w-full my-8" />
        <Lessons />
      </div>
    </main>
  );
}

function Instructors() {
  var { instructors } = useBuyCourse();

  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-gilroy text-[25px] font-extrabold text-text1">
        Instructors
      </h2>

      <div className="flex flex-wrap gap-8">
        {instructors?.map((instructor: any) => (
          <Instructor key={instructor._id} instructor={instructor} />
        ))}
      </div>
    </section>
  );
}
