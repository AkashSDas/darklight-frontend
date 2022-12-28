import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { ArrowIcon } from "@components/shared/icons";
import { useEnrolledCourse, useUser } from "@lib/hooks.lib";
import Logo from "@public/logo.svg";

export default function CourseLearnPage(): JSX.Element {
  var { course, isLoading } = useEnrolledCourse();
  var router = useRouter();

  useEffect(() => {
    if (course && course.course) {
      console.log(course?.course?.groups[0].lessons);
      router.push(
        `/course/${router.query?.id}/learn?lesson=${course.course.groups[0].lessons[0]._id}`,
        undefined,
        { shallow: true }
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
        {/* Navbar */}

        <div className="px-4">{/* Content */}</div>
      </div>
    </div>
  );
}

function Sidebar(): JSX.Element {
  return (
    <section className="fixed pt-4 pb-11 w-[300px] h-full flex flex-col gap-4 border border-solid border-border overflow-y-scroll">
      <LogoSection />
      <GroupsSection />
    </section>
  );
}

// ==============================
// LogoSection
// ==============================

function LogoSection(): JSX.Element {
  return (
    <div className="px-4 h-[34px] flex items-center">
      <Link href="/" className="cursor-pointer">
        <Logo />
      </Link>
    </div>
  );
}

// ==============================
// GroupsSection
// ==============================

function GroupItem(props: any): JSX.Element {
  var router = useRouter();
  var { accessToken } = useUser();
  var [openLessons, setOpenLessons] = useState(false);
  var iconStyle =
    "p-0 h-[20px] w-[20px] rounded-sm hover:bg-background3 active:bg-border";

  function DisplayGroupLessons(): JSX.Element {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpenLessons(!openLessons);
        }}
        className={`${iconStyle} ${openLessons ? "" : "-rotate-90"}`}
      >
        <div className="icon">
          <ArrowIcon size="size_4" />
        </div>
      </button>
    );
  }

  function Emoji({ emoji }: { emoji: string }): JSX.Element {
    return (
      <span className="px-[3px] py-[1px] text-sm rounded-sm bg-background3">
        {emoji}
      </span>
    );
  }

  function Title({ title }: { title: string }): JSX.Element {
    return <span className="text-sm flex-grow">{title}</span>;
  }

  function navigateToLesson(groupId: string, id: string) {
    router.push(`/course/${router.query?.id}/learn?lesson=${id}`, undefined, {
      shallow: true,
    });
  }

  return (
    <>
      <div className="group h-9 px-2 flex gap-3 items-center">
        <DisplayGroupLessons />
        <Emoji emoji={props.group.emoji ?? "🌑"} />
        <Title title={props.group.title ?? "Untitled"} />
      </div>

      {openLessons && (
        <div>
          {props.group.lessons.map((lesson: any) => (
            <div
              key={lesson._id}
              onClick={(e) => {
                e.stopPropagation();
                navigateToLesson(props.group._id, lesson._id);
              }}
              className="h-9 px-2 flex items-center gap-3 group cursor-pointer hover:bg-background3 active:bg-border"
            >
              <span className="w-[18px] h-[18px] opacity-0"></span>

              {/* Circle svg */}
              <svg
                className="fill-current text-text2"
                width={20}
                height={16}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11.75 8a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0Z" />
              </svg>

              <Emoji emoji={lesson.emoji ?? "🌑"} />
              <Title title={lesson.title ?? "Untitled"} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function GroupsSection(): JSX.Element {
  var { course } = useEnrolledCourse();

  return (
    <ul className="mt-4 flex flex-col">
      {course?.course?.groups.map((groupItem: any, index: number) => (
        <div key={groupItem._id}>
          <GroupItem group={groupItem} />
        </div>
      ))}
    </ul>
  );
}
