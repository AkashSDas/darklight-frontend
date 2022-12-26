import { ReactElement } from "react";

import ContentBlockOptions from "@components/lesson-editor/content-block-options";
import EditContentBlocks from "@components/lesson-editor/edit-content-blocks";
import LessonEmojiInput from "@components/lesson-editor/emoji-input";
import SearchBlockInput from "@components/lesson-editor/search-block-input";
import LessonTitleInput from "@components/lesson-editor/title-input";
import CourseEditorLayout from "@components/shared/course-editor-layout";

export default function EditLessonPage(): JSX.Element {
  function Divider(): JSX.Element {
    return <hr className="bg-border my-2 h-[1px] w-full" />;
  }

  function MainContent(): JSX.Element {
    return (
      <main className="mr-[300px] w-full flex flex-col gap-2 items-center">
        <div className="px-16 w-full max-w-[800px] flex flex-col gap-2 items-start">
          <LessonEmojiInput />
          <LessonTitleInput />
          <Divider />
          <EditContentBlocks />
        </div>
      </main>
    );
  }

  function ActionPanel(): JSX.Element {
    return (
      <aside className="pb-24 w-full right-0 max-w-[300px] flex flex-col gap-6 py-4 fixed overflow-y-scroll h-full border-l border-solid border-l-border">
        <SearchBlockInput />
        <ContentBlockOptions />
      </aside>
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
