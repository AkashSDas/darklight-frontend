import { useDropdown, useEditableCourse, useUser } from "../../lib/hooks.lib";
import { updateCourseSettings } from "../../services/course.service";
import { TextBadge } from "../badges/text";
import { ArrowDownIcon } from "../icons/arrow-down";

export default function DifficultyLevelInput() {
  var { isOpen, setIsOpen, wrapperRef } = useDropdown();
  var { course, mutateCourse, courseId } = useEditableCourse();
  var { accessToken } = useUser();

  return (
    <section className="w-full flex justify-between items-center gap-2">
      <div className="flex flex-col gap-2 w-full">
        <div>
          <TextBadge variant="regular">🥋</TextBadge>{" "}
          <span className="text-text1">Difficulty level</span>
        </div>

        <p className="text-sm">{"Who's"} your target audience?</p>
      </div>

      {/* Dropdown input  */}
      <div
        ref={wrapperRef}
        onClick={() => setIsOpen(true)}
        className="relative max-w-[200px] w-full rounded-lg hover:bg-gray-50 px-1 py-1 cursor-pointer"
      >
        {/* Display tags */}
        <div className="flex items-center gap-2">
          <TextBadge variant="regular">🏋🏼‍♀️</TextBadge>{" "}
          <span className="text-text1 flex-grow">
            {course?.difficulty[0].toUpperCase() + course?.difficulty.slice(1)}
          </span>
          <div className="flex justify-center items-center px-1 py-1 rounded-sm hover:bg-background2 active:bg-background3">
            <ArrowDownIcon size="20" />
          </div>
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className="z-10 absolute top-0 right-0 w-full px-1 py-1 rounded-lg bg-background1 border border-solid border-border shadow-lg flex flex-col">
            {["Beginner", "Intermediate", "Advanced"].map((difficulty) => (
              <div
                key={difficulty}
                onClick={async () => {
                  let update = {
                    difficulty,
                    lastEditedOn: new Date(Date.now()),
                  };
                  let optimisticData = {
                    success: true,
                    course: { ...course, ...update },
                    error: null,
                  };

                  await mutateCourse(async () => optimisticData, {
                    optimisticData,
                    revalidate: false,
                  });
                  await updateCourseSettings(accessToken, courseId, {
                    difficulty: difficulty.toLowerCase(),
                    lastEditedOn: new Date(Date.now()),
                  });
                  setIsOpen(false);
                }}
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
        )}
      </div>
    </section>
  );
}
