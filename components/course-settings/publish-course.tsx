import { updateCourseStatus } from "services/course.service";

import { useEditableCourse, useUser } from "../../lib/hooks.lib";
import SwitchButton from "../button/switch";
import { TextBadge } from "../shared/text-badge";

export default function PublishCourse() {
  var { course } = useEditableCourse();
  var { accessToken } = useUser();

  return (
    <section className="w-full flex justify-between items-center gap-2">
      <div className="flex flex-col gap-2 w-full">
        <div>
          <TextBadge variant="regular">🌍</TextBadge>{" "}
          <span className="text-text1">Publish</span>
        </div>

        <p className="text-sm">Make it live</p>
      </div>

      <div className="max-w-[300px] flex items-center justify-end w-full">
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
      </div>
    </section>
  );
}
