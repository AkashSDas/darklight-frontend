import { ReactElement } from "react";

import CourseEditorLayout from "@components/course-editor/layout";
import LessonEmojiInput from "@components/lesson-editor-settings/emoji-input";
import { useEditableLesson } from "@lib/hooks.lib";

export default function LessonPage() {
  var { loading, lesson } = useEditableLesson();

  if (loading) return <div>Loading...</div>;

  return (
    <main className="mt-4 w-full flex flex-col gap-2 items-center">
      <section className="w-full max-w-[800px] flex flex-col gap-2">
        <LessonEmojiInput />
      </section>
    </main>
  );
}

LessonPage.getLayout = function getLayout(page: ReactElement) {
  return <CourseEditorLayout>{page}</CourseEditorLayout>;
};
