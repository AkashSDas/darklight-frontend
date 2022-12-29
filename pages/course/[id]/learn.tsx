import { useRouter } from "next/router";
import { useEffect } from "react";

import DisplayLessonContent from "@components/learn-course/display-lesson-content";
import Navbar from "@components/learn-course/navbar";
import Sidebar from "@components/learn-course/sidebar";
import { useAppDispatch, useEnrolledCourse } from "@lib/hooks.lib";
import { setDropdownContext, setLessonBreadcrum } from "@store/enrolled-course/slice";

export default function CourseLearnPage(): JSX.Element {
  var { enrolledCourse: course, isLoading } = useEnrolledCourse();
  var router = useRouter();
  var dispatch = useAppDispatch();

  useEffect(() => {
    if (course && course.course) {
      router.push(
        `/course/${router.query?.id}/learn?lesson=${course.course.groups[0].lessons[0]._id}`,
        undefined,
        { shallow: true }
      );

      dispatch(setDropdownContext("lesson"));
      dispatch(
        setLessonBreadcrum({
          group: {
            _id: course.course.groups[0]._id,
            title: course.course.groups[0].title,
            emoji: course.course.groups[0].emoji,
          },
          lesson: {
            _id: course.course.groups[0].lessons[0]._id,
            title: course.course.groups[0].lessons[0].title,
            emoji: course.course.groups[0].lessons[0].emoji,
          },
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course?.course?._id]);

  if (isLoading) {
    return <div className="font-urbanist font-medium">Loading...</div>;
  }

  return (
    <div className="mb-8 flex font-urbanist font-medium">
      <Sidebar />

      <div className="ml-[300px] w-full">
        <Navbar />

        <main className="w-full flex flex-col gap-2 items-center">
          <div className="w-full max-w-[800px] flex flex-col gap-2 items-center">
            <DisplayLessonContent />
          </div>
        </main>
      </div>
    </div>
  );
}
