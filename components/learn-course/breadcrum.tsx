import { TextBadge } from "@components/shared/text-badge";
import { useAppSelector, useEnrolledCourse } from "@lib/hooks.lib";

export default function BreadCrum(): JSX.Element {
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
