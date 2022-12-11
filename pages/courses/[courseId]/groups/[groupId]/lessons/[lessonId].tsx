import { ReactElement } from "react";

import CourseEditorLayout from "@components/course-editor/layout";
import { SearchIcon } from "@components/icons/search";
import ContentBlocks from "@components/lesson-editor-settings/content-blocks";
import LessonEmojiInput from "@components/lesson-editor-settings/emoji-input";
import TitleInput from "@components/lesson-editor-settings/title-input";
import ContentBlockDropdown from "@components/lesson-layout/content-block-dropdown";
import SearchBlockInput from "@components/lesson-layout/search-block-input";
import { useEditableLesson } from "@lib/hooks.lib";

export default function LessonPage() {
  var { loading } = useEditableLesson();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex relative">
      <main className="mt-4 mr-[300px] w-full flex flex-col gap-2 items-center">
        <section className="w-full max-w-[840px] flex flex-col gap-2 px-16">
          <LessonEmojiInput />
          <TitleInput />
          <hr className="bg-border my-2 h-[1px]" />
          <ContentBlocks />
        </section>
      </main>

      <aside className="w-full right-0 max-w-[300px] flex flex-col gap-2 py-4 fixed overflow-y-scroll h-full border-l border-solid border-l-border">
        <SearchBlockInput />
        <hr className="bg-border my-2 mx-4 h-[1px]" />
        <ContentBlockDropdown />

        <div className="my-8" />
      </aside>
    </div>
  );
}

LessonPage.getLayout = function getLayout(page: ReactElement) {
  return <CourseEditorLayout>{page}</CourseEditorLayout>;
};
