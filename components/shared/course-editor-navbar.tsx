import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";

import { useEditableCourse, useEditableGroup, useEditableLesson } from "@lib/hooks.lib";

import { DiscussionIcon, EyeIcon, MoreIcon, NotificationIcon, SearchIcon } from "./icons";
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

        <button className="icon_btn">
          <MoreIcon size="size_5" />
        </button>
      </div>
    </nav>
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
