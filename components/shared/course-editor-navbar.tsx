import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { deleteGroup } from "services/group.service";
import { deleteLesson } from "services/lesson.service";

import { useDropdown, useEditableCourse, useEditableGroup, useEditableLesson, useUser } from "@lib/hooks.lib";

import { DiscussionIcon, EyeIcon, MoreIcon, NotificationIcon, SearchIcon, TrashIcon } from "./icons";
import { TextBadge } from "./text-badge";

dayjs.extend(relativeTime);

export default function CourseEditorNavbar(): JSX.Element {
  var { course } = useEditableCourse();

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

        <button className="icon_btn">
          <EyeIcon size="size_5" />
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

  useEffect(
    function updateContext() {
      // Order of if statements is important because a lesson route will
      // have groups and courses
      if (router.pathname.includes("/lessons/")) {
        setContext("lesson");
      } else if (router.pathname.includes("/groups/")) {
        setContext("group");
      } else if (router.pathname.includes("/courses/")) {
        setContext("course");
      }
    },
    [router.pathname]
  );

  function Dropdown(): JSX.Element {
    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
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
    var { mutateCourse, group, courseId } = useEditableGroup();
    var [loading, setLoading] = useState(false);
    var { accessToken } = useUser();

    async function removeGroup(e: any) {
      e.stopPropagation();
      if (loading) return;
      setLoading(true);

      mutateCourse(
        (data) =>
          ({
            ...data,
            course: {
              ...data!.course,
              groups: data!.course.groups.filter(
                (g: any) => g._id != group!._id
              ),
            },
          } as any),
        false
      );

      setIsOpen(false);
      toast.success("Group deleted");
      router.push(`/courses/${courseId}/settings`);

      var { success } = await deleteGroup(courseId, group!._id, accessToken);

      if (!success) toast.error("Failed to group lesson");

      setLoading(false);
    }

    return (
      <>
        <div
          onClick={(e) => removeGroup(e)}
          className="p-2 flex gap-2 items-center hover:bg-background3 active:bg-border rounded-md"
        >
          <span className="icon">
            <TrashIcon size="size_4" />
          </span>

          <span className="text-sm">
            {loading ? "Deleting..." : "Delete group"} {loading.toString()}
          </span>
        </div>
      </>
    );
  }

  function LessonPanel(): JSX.Element {
    var { mutateCourse, group, courseId } = useEditableGroup();
    var { lesson } = useEditableLesson();
    var [loading, setLoading] = useState(false);
    var { accessToken } = useUser();

    async function removeLesson() {
      if (loading) return;
      setLoading(true);

      mutateCourse(
        (data) =>
          ({
            ...data,
            course: {
              ...data!.course,
              groups: data!.course.groups.map((g: any) => {
                if (g._id == group!._id) {
                  return {
                    ...g,
                    lessons: g.lessons.filter((l: any) => l._id != lesson!._id),
                  };
                }

                return g;
              }),
            },
          } as any),
        false
      );

      var { success } = await deleteLesson(
        courseId,
        group!._id,
        lesson!._id,
        accessToken
      );

      if (success) {
        toast.success("Lesson deleted");
        router.push(`/courses/${courseId}/groups/${group!._id}`);
      } else toast.error("Failed to delete lesson");

      setLoading(false);
    }

    return (
      <>
        <div
          onClick={removeLesson}
          className="p-2 flex gap-2 items-center hover:bg-background3 active:bg-border rounded-md"
        >
          <span className="icon">
            <TrashIcon size="size_4" />
          </span>

          <span className="text-sm">
            {loading ? "Deleting..." : "Delete lesson"}
          </span>
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

function BreadCrum(): JSX.Element {
  var { course } = useEditableCourse();
  var { group } = useEditableGroup();
  var { lesson } = useEditableLesson();

  function getContext(type: "course" | "group" | "lesson") {
    if (type == "course" && course) {
      return { type: "course", title: course.title, id: course._id };
    } else if (type == "group" && group) {
      return { type: "group", title: group.title, id: group._id };
    } else if (type == "lesson" && lesson) {
      return { type: "lesson", title: lesson.title, id: lesson._id };
    }

    return null;
  }

  function CourseLink(): JSX.Element {
    var context = getContext("course");
    if (!context) return <></>;

    return (
      <Link href={`/courses/${course._id}/settings`}>
        <div className="p-[2px] flex items-center text-sm cursor-pointer rounded-[3px] hover:bg-background3 active:bg-border">
          <TextBadge variant="regular">{course.emoji ?? "🎁"}</TextBadge>{" "}
          <span className="ml-1 pr-1">{course.title ?? "Untitled"} </span>
        </div>
      </Link>
    );
  }

  function GroupLink(): JSX.Element {
    var context = getContext("group");
    if (!context) return <></>;

    return (
      <Link href={`/courses/${course.id}/groups/${group._id}`}>
        <div className="p-[2px] flex items-center text-sm cursor-pointer rounded-[3px] hover:bg-background3 active:bg-border">
          <TextBadge variant="regular">{group.emoji ?? "📦"}</TextBadge>{" "}
          <span className="ml-1 pr-1">{group.title ?? "Untitled"} </span>
        </div>
      </Link>
    );
  }

  function LessonLink(): JSX.Element {
    var context = getContext("lesson");
    if (!context) return <></>;

    return (
      <Link
        href={`/courses/${course.id}/groups/${group._id}/lessons/${lesson._id}`}
      >
        <div className="p-[2px] flex items-center text-sm cursor-pointer rounded-[3px] hover:bg-background3 active:bg-border">
          <TextBadge variant="regular">{lesson.emoji ?? "🍈"}</TextBadge>{" "}
          <span className="ml-1 pr-1">{lesson.title ?? "Untitled"} </span>
        </div>
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <CourseLink />

      {getContext("group") ? (
        <div className="text-text2 text-sm opacity-50">/</div>
      ) : null}

      <GroupLink />

      {getContext("lesson") ? (
        <div className="text-text2 text-sm opacity-50">/</div>
      ) : null}

      <LessonLink />
    </div>
  );
}

function LastEditedOn(): JSX.Element {
  var { course } = useEditableCourse();
  var { group } = useEditableGroup();
  var { lesson } = useEditableLesson();

  function getLastEditedOn() {
    if (lesson?.lastEditedOn) return lesson.lastEditedOn;
    if (group?.lastEditedOn) return group.lastEditedOn;
    if (course?.lastEditedOn) return course.lastEditedOn;

    return null;
  }

  return (
    <div className="px-2 h-[34px] flex items-center justify-center text-sm text-[#BFBFBF]">
      {dayjs(new Date(getLastEditedOn())).fromNow()}
    </div>
  );
}
