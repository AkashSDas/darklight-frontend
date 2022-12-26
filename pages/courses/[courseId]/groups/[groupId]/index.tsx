import { ReactElement } from "react";

import GroupDescriptionInput from "@components/course-editor-settings/group-description-input";
import GroupEmojiInput from "@components/course-editor-settings/group-emoji-input";
import GroupTitleInput from "@components/course-editor-settings/group-title-input";
import CourseEditorLayout from "@components/shared/course-editor-layout";

export default function GroupSettingsPage(): JSX.Element {
  return (
    <main className="w-full flex flex-col gap-2 items-center">
      <div className="w-full max-w-[800px] flex flex-col gap-2 items-start">
        <GroupEmojiInput />
        <GroupTitleInput />
        <GroupDescriptionInput />
      </div>
    </main>
  );
}

GroupSettingsPage.getLayout = function getLayout(page: ReactElement) {
  return <CourseEditorLayout context="group">{page}</CourseEditorLayout>;
};
