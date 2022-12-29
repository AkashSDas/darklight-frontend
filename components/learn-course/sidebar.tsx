import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toggleLessonCompletion } from "services/enrolled-course.service";

import { ArrowIcon, DoneIcon } from "@components/shared/icons";
import { useAppDispatch, useEnrolledCourse, useUser } from "@lib/hooks.lib";
import Logo from "@public/logo.svg";
import { setLessonBreadcrum } from "@store/enrolled-course/slice";

export default function Sidebar(): JSX.Element {
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
  var { enrolledCourse, mutateEnrolledCourse } = useEnrolledCourse();

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

  var [markLessonAsDone, setMarkLessonAsDone] = useState(false);

  async function handleLessonCompletionStatus(lessonId: string) {
    var marked = enrolledCourse.doneLessons.includes(lessonId);

    mutateEnrolledCourse(
      (data) =>
        ({
          ...data,
          course: {
            ...data!.course,
            doneLessons: marked
              ? data!.course!.doneLessons.filter((id: string) => id != lessonId)
              : [...data!.course!.doneLessons, lessonId],
          },
        } as any),
      false
    );

    setMarkLessonAsDone(true);
    await toggleLessonCompletion(
      enrolledCourse._id,
      enrolledCourse.course._id,
      lessonId,
      accessToken
    );
    setMarkLessonAsDone(false);
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

              <span
                onClick={async (e) => {
                  e.stopPropagation();
                  if (markLessonAsDone) return;
                  await handleLessonCompletionStatus(lesson._id);
                }}
                className="icon p-1 rounded-md cursor-pointer hover:bg-background3 active:bg-border"
              >
                <DoneIcon
                  done={enrolledCourse.doneLessons.includes(lesson._id)}
                />
              </span>

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
