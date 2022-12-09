import { ReactElement } from "react";

import CourseEditorLayout from "../../../../../components/course-editor/layout";
import GroupDescriptionInput from "../../../../../components/group-settings/description-input";
import GroupEmojiInput from "../../../../../components/group-settings/emoji-input";
import GroupTitleInput from "../../../../../components/group-settings/title-input";

export default function GroupPage() {
  return (
    <main className="mt-4 w-full flex flex-col gap-2 items-center">
      <section className="w-full max-w-[800px] flex flex-col gap-2">
        <GroupEmojiInput />
        <GroupTitleInput />
        <GroupDescriptionInput />
      </section>
    </main>
  );
}

GroupPage.getLayout = function getLayout(page: ReactElement) {
  return <CourseEditorLayout>{page}</CourseEditorLayout>;
};
