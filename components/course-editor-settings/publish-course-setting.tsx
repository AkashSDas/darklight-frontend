import { toast } from "react-hot-toast";
import { updateCourseStatus } from "services/course.service";

import SwitchButton from "@components/shared/switch-btn";
import { useEditableCourse, useUser } from "@lib/hooks.lib";

import SettingSection from "./setting-section";

export default function PublishCourseSetting(): JSX.Element {
  var emoji = "🌍";
  var title = "Publish";
  var description = "Make it live";
  var info = { emoji, title, description };

  var { accessToken } = useUser();
  var { course } = useEditableCourse();

  return (
    <SettingSection {...info}>
      <SwitchButton
        checked={course.stage == "draft" ? false : true}
        onChange={async () => {
          if (course.stage == "draft") {
            await updateCourseStatus(course.id, accessToken, "published");
          } else {
            await updateCourseStatus(course.id, accessToken, "draft");
          }
        }}
      />
    </SettingSection>
  );
}
