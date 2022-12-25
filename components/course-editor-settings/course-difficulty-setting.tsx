import { updateCourseSettings } from "services/course.service";

import { ArrowIcon } from "@components/shared/icons";
import { TextBadge } from "@components/shared/text-badge";
import { useDropdown, useEditableCourse, useUser } from "@lib/hooks.lib";

import SettingSection from "./setting-section";

export default function CourseDifficultySetting(): JSX.Element {
  var emoji = "🥋";
  var title = "Difficulty level";
  var description = "Who's your target audience?";
  var info = { emoji, title, description };

  var { accessToken } = useUser();
  var { isOpen, setIsOpen, wrapperRef } = useDropdown();
  var { course, mutateCourse, courseId } = useEditableCourse();

  async function updateDifficultyLevel(
    difficulty: "beginner" | "intermediate" | "advanced"
  ) {
    mutateCourse(
      (data) => ({ ...data, course: { ...data?.course, difficulty } } as any),
      false
    );

    await updateCourseSettings(accessToken, courseId, { difficulty });
  }

  function DisplayCurrentDifficultyLevel(): JSX.Element {
    return (
      <div className="flex items-center gap-2">
        <TextBadge variant="regular">🏋🏼‍♀️</TextBadge>{" "}
        <span className="text-text1 flex-grow">
          {course?.difficulty[0].toUpperCase() + course?.difficulty.slice(1)}
        </span>
        <div className="flex justify-center items-center px-1 py-1 rounded-sm hover:bg-background2 active:bg-background3">
          <ArrowIcon size="size_4" />
        </div>
      </div>
    );
  }

  function Dropdown(): JSX.Element | null {
    if (!isOpen) return null;

    return (
      <div className="z-10 absolute top-0 right-0 w-full px-1 py-1 rounded-lg bg-background1 border border-solid border-border shadow-lg flex flex-col">
        {["Beginner", "Intermediate", "Advanced"].map((difficulty) => (
          <div
            key={difficulty}
            onClick={() =>
              updateDifficultyLevel(difficulty.toLowerCase() as any)
            }
            className="flex items-center gap-2 px-1 py-1 rounded-lg hover:bg-background2 active:bg-background3 cursor-pointer"
          >
            <TextBadge variant="regular">
              {difficulty == "Beginner"
                ? "🐥"
                : difficulty == "Intermediate"
                ? "🪖"
                : "👑"}
            </TextBadge>{" "}
            <span className="text-text1 text-sm">
              {difficulty[0].toUpperCase() + difficulty.slice(1)}{" "}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <SettingSection {...info}>
      <div
        ref={wrapperRef}
        onClick={() => setIsOpen(true)}
        className="relative max-w-[200px] w-full rounded-lg hover:bg-gray-50 px-1 py-1 cursor-pointer"
      >
        <DisplayCurrentDifficultyLevel />
        <Dropdown />
      </div>
    </SettingSection>
  );
}
