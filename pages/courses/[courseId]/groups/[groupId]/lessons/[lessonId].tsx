import { ReactElement } from "react";

import LessonEmojiInput from "@components/lesson-editor/emoji-input";
import LessonTitleInput from "@components/lesson-editor/title-input";
import CourseEditorLayout from "@components/shared/course-editor-layout";

export default function EditLessonPage(): JSX.Element {
  function MainContent(): JSX.Element {
    return (
      <main className="mr-[300px] w-full flex flex-col gap-2 items-center">
        <div className="w-full max-w-[800px] flex flex-col gap-2 items-start">
          <LessonEmojiInput />
          <LessonTitleInput />
        </div>
      </main>
    );
  }

  function ActionPanel(): JSX.Element {
    return (
      <aside className="pb-8 w-full right-0 max-w-[300px] flex flex-col gap-2 py-4 fixed overflow-y-scroll h-full border-l border-solid border-l-border"></aside>
    );
  }

  return (
    <div className="flex relative">
      <MainContent />
      <ActionPanel />
    </div>
  );
}

EditLessonPage.getLayout = function getLayout(page: ReactElement) {
  return <CourseEditorLayout context="lesson">{page}</CourseEditorLayout>;
};
