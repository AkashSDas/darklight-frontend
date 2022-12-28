import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";
import { getCourses } from "services/course.service";
import useSWR from "swr";

import BaseLayout from "@components/shared/base-layout";
import { TextBadge } from "@components/shared/text-badge";

export default function HomePage(): JSX.Element {
  return (
    <main className="mt-12 px-8 font-urbanist font-medium">
      <TrendingCourses />
    </main>
  );
}

function TrendingCourses(): JSX.Element {
  var { data, error, isLoading } = useSWR("public-courses", getCourses, {
    revalidateOnFocus: false,
  });

  function CourseItem({ course }: { course: any }): JSX.Element {
    return (
      <Link href={`/course/${course._id}`}>
        <div className="flex flex-col items-center gap-3">
          <div className="relative w-[300px] h-[150px]">
            <Image
              src={
                course.coverImage?.URL ??
                "https://media.giphy.com/media/tZ4K7k7wZ8B8I/giphy.gif"
              }
              alt={course.title ?? "Course cover image"}
              fill
              className="rounded-xl object-cover"
            />
          </div>

          <div className="flex items-center justify-center gap-1">
            <span className="text-[12.9px]">Produced by</span>

            <div className="relative w-8 h-6">
              <Image
                src={
                  course.instructors[0]?.profileImage?.URL ??
                  "https://media.giphy.com/media/HfFccPJv7a9k4/giphy.gif"
                }
                alt={course.title ?? "Course cover image"}
                fill
                className="rounded-lg object-cover"
              />
            </div>

            <span className="text-[12.9px] font-bold text-text1">
              {course.instructors[0]?.username}
            </span>
          </div>

          <h3 className="text-[18px] font-bold text-text1">{course.title}</h3>

          <div className="flex items-center justify-center gap-1">
            {course.tags.slice(0, 3).map((tag: string) => (
              <span
                key={tag}
                className="px-[6px] h-[20px] text-[11px] flex items-center justify-center bg-background3 rounded-md"
              >
                {tag[0].toUpperCase() + tag.slice(1)}
              </span>
            ))}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <section>
      <h2 className="mb-6 font-gilroy text-[25px] font-extrabold text-text1">
        <TextBadge variant="regular">🌍</TextBadge> {"What's"} the world is
        learning
      </h2>

      {isLoading && <p>Loading...</p>}
      {error && <p>Something went wrong</p>}

      {data && (
        <div className="flex gap-12 overflow-x-scroll">
          {data.courses.map((course: any) => (
            <CourseItem key={course._id} course={course} />
          ))}
        </div>
      )}
    </section>
  );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
