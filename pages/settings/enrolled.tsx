import { useRouter } from "next/router";
import { ReactElement, useState } from "react";

import { TextBadge } from "@components/shared/text-badge";
import UserSettingsLayout from "@components/shared/user-settings-layout";
import { useEnrolledCourses } from "@lib/hooks.lib";

export default function CoursesEnrolledInPage(): JSX.Element {
  return (
    <main className="w-full flex flex-col gap-2 items-center">
      <div className="py-4 w-full max-w-[800px] flex flex-col gap-2 items-center">
        <UserEnrolledInCourses />
      </div>
    </main>
  );
}

function UserEnrolledInCourses(): JSX.Element {
  var router = useRouter();
  var { courses, isLoading, hasNext, goToNext } = useEnrolledCourses();

  return (
    <section className="w-full">
      <h2 className="text-text1 font-gilroy font-extrabold text-[25px]">
        Courses {"you're"} enrolled in
      </h2>

      <hr className="bg-border h-[1px] w-full my-4" />

      <div className="flex flex-col w-full">
        {!isLoading && courses?.length == 0 && (
          <div className="text-text1 text-sm">
            {"You're"} not enrolled in any courses yet!
          </div>
        )}

        {courses?.map((enrolledCourse: any) => {
          var { course } = enrolledCourse;

          // Percentage of course completed
          var numOfLessons = course.groups.reduce(
            (acc: number, grp: any) => acc + grp.lessons.length,
            0
          );
          var numOfCompletedLessons = enrolledCourse.doneLessons.length;
          var percentageCompleted = Math.round(
            (numOfCompletedLessons / numOfLessons) * 100
          );

          return (
            <div
              key={course._id}
              onClick={() => router.push(`/course/${course._id}/learn`)}
              className="px-2 py-1 gap-2 flex items-center hover:bg-background3 active:bg-border cursor-pointer rounded-md"
            >
              <TextBadge variant="regular">{course.emoji ?? "👾"}</TextBadge>
              <span className="flex-grow">{course.title ?? "Untitled"}</span>
              {course.stage == "published" && (
                <span className="text-sm">
                  <TextBadge variant="highlight">
                    {percentageCompleted.toString() + "% is completed"}
                  </TextBadge>
                </span>
              )}
            </div>
          );
        })}

        {hasNext && (
          <button
            className="mt-6 px-4 py-2 flex justify-start bg-background3 rounded-md"
            onClick={goToNext}
          >
            Load more
          </button>
        )}

        {!isLoading && !hasNext && courses?.length > 0 && (
          <div className="mt-6 px-4 py-2 bg-background3 rounded-md">
            No more courses
          </div>
        )}

        {isLoading && (
          <div className="mt-6 px-4 py-2 bg-background3 rounded-md">
            Loading...
          </div>
        )}
      </div>
    </section>
  );
}

CoursesEnrolledInPage.getLayout = function getLayout(page: ReactElement) {
  return <UserSettingsLayout>{page}</UserSettingsLayout>;
};
