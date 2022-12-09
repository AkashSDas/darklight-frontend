import { ReactElement } from "react";

import CourseEditorLayout from "../../../../components/course-editor/layout";
import GroupEmojiInput from "../../../../components/group-settings/emoji-input";
import GroupTitleInput from "../../../../components/group-settings/title-input";
import { useEditableGroup } from "../../../../lib/hooks.lib";

export default function GroupPage() {
  var { group } = useEditableGroup();

  return (
    <main className="mt-4 w-full flex flex-col gap-2 items-center">
      <section className="w-full max-w-[800px] flex flex-col gap-2">
        <GroupEmojiInput />
        <GroupTitleInput />
      </section>
    </main>
  );
}

GroupPage.getLayout = function getLayout(page: ReactElement) {
  return <CourseEditorLayout>{page}</CourseEditorLayout>;
};
