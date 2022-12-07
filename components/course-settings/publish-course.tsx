import { useEditableCourse } from "../../lib/hooks.lib";
import { TextBadge } from "../badges";
import SwitchButton from "../button/switch";

export default function PublishCourse() {
  var { course } = useEditableCourse();

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
          onChange={() => {}}
        />
      </div>
    </section>
  );
}
