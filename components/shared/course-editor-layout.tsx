import { useRouter } from "next/router";
import { useCallback } from "react";

import CourseEditorSidebar from "@components/shared/course-editor-sidebar";
import { useEditableCourse, useEditableGroup, useEditableLesson, useUser } from "@lib/hooks.lib";

import CourseEditorNavbar from "./course-editor-navbar";

interface Props {
  children: JSX.Element | JSX.Element[] | string | string[] | null;
  context: "course" | "group" | "lesson";
}

export default function CourseEditorLayout(props: Props): JSX.Element {
  var { course, loading } = useEditableCourse();
  var { group, courseLoading } = useEditableGroup();
  var { lesson, loading: lessonLoading } = useEditableLesson();
  var router = useRouter();
  var { user } = useUser();

  var DisplayContent = useCallback((): JSX.Element => {
    if (!user) return <div>Unauthorized</div>;

    if (props.context == "lesson" && router.query?.lessonId) {
      if (lesson) return <>{props.children}</>;
      else if (lessonLoading) return <div>Loading...</div>;
      else return <div>Lesson not found</div>;
    } else if (props.context == "group" && router.query?.groupId) {
      if (group) return <>{props.children}</>;
      else if (courseLoading) return <div>Loading...</div>;
      else return <div>Group not found</div>;
    } else if (props.context == "course" && router.query?.courseId) {
      if (course) return <>{props.children}</>;
      else if (loading) return <div>Loading...</div>;
      else return <div>Course not found</div>;
    }

    return <div>Loading...</div>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonLoading, loading, user]);

  return (
    <div className="mb-8 flex font-urbanist font-medium">
      <CourseEditorSidebar />

      <div className="ml-[300px] w-full">
        <CourseEditorNavbar />

        <div className="px-4">
          <DisplayContent />
        </div>
      </div>
    </div>
  );
}
