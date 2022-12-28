import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { ArrowIcon, DiscussionIcon, MoreIcon, NotificationIcon, SearchIcon, TrashIcon } from "@components/shared/icons";
import { TextBadge } from "@components/shared/text-badge";
import { useAppDispatch, useAppSelector, useDropdown, useEnrolledCourse, useUser } from "@lib/hooks.lib";
import Logo from "@public/logo.svg";
import { setDropdownContext, setLessonBreadcrum } from "@store/enrolled-course/slice";

dayjs.extend(relativeTime);

function BreadCrum(): JSX.Element {
  var { course } = useEnrolledCourse();

  function CourseLink(): JSX.Element {
    return (
      <div className="p-[2px] flex items-center text-sm cursor-pointer rounded-[3px] hover:bg-background3 active:bg-border">
        <TextBadge variant="regular">{course.emoji ?? "🎁"}</TextBadge>{" "}
        <span className="ml-1 pr-1">{course.title ?? "Untitled"} </span>
      </div>
    );
  }

  function GroupLink(): JSX.Element {
    var { group } = useAppSelector((state) => state.enrolledCourse.breadcrum);

    return (
      <div className="p-[2px] flex items-center text-sm cursor-pointer rounded-[3px] hover:bg-background3 active:bg-border">
        <TextBadge variant="regular">{group?.emoji ?? "📦"}</TextBadge>{" "}
        <span className="ml-1 pr-1">{group?.title ?? "Untitled"} </span>
      </div>
    );
  }

  function LessonLink(): JSX.Element {
    var { group, lesson } = useAppSelector(
      (state) => state.enrolledCourse.breadcrum
    );

    return (
      <div className="p-[2px] flex items-center text-sm cursor-pointer rounded-[3px] hover:bg-background3 active:bg-border">
        <TextBadge variant="regular">{lesson?.emoji ?? "🍈"}</TextBadge>{" "}
        <span className="ml-1 pr-1">{lesson?.title ?? "Untitled"} </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <CourseLink />
      <div className="text-text2 text-sm opacity-50">/</div>
      <GroupLink />
      <div className="text-text2 text-sm opacity-50">/</div>
      <LessonLink />
    </div>
  );
}

function LastEditedOn(): JSX.Element {
  return (
    <div className="px-2 h-[34px] flex items-center justify-center text-sm text-[#BFBFBF]">
      {/* {dayjs(new Date(getLastEditedOn())).fromNow()} */}
    </div>
  );
}

function Navbar(): JSX.Element {
  var { enrolledCourse: course } = useEnrolledCourse();

  if (!course) {
    return (
      <nav className="sticky top-0 z-10 pt-4 px-4 h-[76px] w-full flex items-center justify-between bg-background1"></nav>
    );
  }

  return (
    <nav className="sticky top-0 z-10 py-4 px-4 w-full flex items-center justify-between bg-background1">
      <BreadCrum />

      <div className="flex gap-3 items-center">
        <LastEditedOn />

        <button className="icon_btn">
          <NotificationIcon size="size_5" />
        </button>

        <button className="icon_btn">
          <DiscussionIcon size="size_5" />
        </button>

        <button className="icon_btn">
          <SearchIcon size="size_5" />
        </button>

        <MoreButton />
      </div>
    </nav>
  );
}

function MoreButton() {
  var router = useRouter();
  var { wrapperRef, isOpen, setIsOpen } = useDropdown();
  var [context, setContext] = useState<"course" | "group" | "lesson" | null>(
    null
  );
  var context = useAppSelector((state) => state.enrolledCourse.dropdownContext);

  function Dropdown(): JSX.Element {
    return (
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-11 right-0 px-2 py-1 w-[300px] flex flex-col bg-background1 border border-solid border-border rounded-md shadow-xl"
      >
        {context == "course" ? <CoursePanel /> : null}
        {context == "group" ? <GroupPanel /> : null}
        {context == "lesson" ? <LessonPanel /> : null}
      </div>
    );
  }

  function CoursePanel(): JSX.Element {
    return (
      <>
        <div className="p-2 flex gap-2 items-center hover:bg-background3 active:bg-border rounded-md">
          <span className="icon">
            <TrashIcon size="size_4" />
          </span>

          <span className="text-sm">Delete course</span>
        </div>
      </>
    );
  }

  function GroupPanel(): JSX.Element {
    return (
      <>
        <div className="p-2 flex gap-2 items-center hover:bg-background3 active:bg-border rounded-md">
          <span className="icon">
            <TrashIcon size="size_4" />
          </span>

          <span className="text-sm">Delete group</span>
        </div>
      </>
    );
  }

  function LessonPanel(): JSX.Element {
    return (
      <>
        <div className="p-2 flex gap-2 items-center hover:bg-background3 active:bg-border rounded-md">
          <span className="icon">
            <TrashIcon size="size_4" />
          </span>

          <span className="text-sm">Delete lesson</span>
        </div>
      </>
    );
  }

  return (
    <button
      className="icon_btn relative"
      ref={wrapperRef}
      onClick={() => setIsOpen(!isOpen)}
    >
      <MoreIcon size="size_5" />

      {isOpen && context ? <Dropdown /> : null}
    </button>
  );
}

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
  var dispatch = useAppDispatch();

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

  function navigateToLesson(lesson: any) {
    dispatch(
      setLessonBreadcrum({
        group: {
          _id: props.group._id,
          title: props.group.title,
          emoji: props.group.emoji,
        },
        lesson: { _id: lesson._id, title: lesson.title, emoji: lesson.emoji },
      })
    );
    router.push(
      `/course/${router.query?.id}/learn?lesson=${lesson._id}`,
      undefined,
      {
        shallow: true,
      }
    );
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
                navigateToLesson(lesson);
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
  var { enrolledCourse: course } = useEnrolledCourse();

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
