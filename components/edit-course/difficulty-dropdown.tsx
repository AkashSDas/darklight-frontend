import { ArrowDownIcon } from "@components/icons";
import useDropdown from "@hooks/dropdown";
import { useAppDispatch, useAppSelector } from "@hooks/store";
import { selectEditableCourse } from "@store/editable-course/slice";
import { updateCourseInfoThunk } from "@store/editable-course/thunk";

function CourseDifficultyDropdown() {
  var { course } = useAppSelector(selectEditableCourse);
  var dispatch = useAppDispatch();
  var { isOpen, setIsOpen, wrapperRef } = useDropdown();

  async function updateDifficulty(difficulty: string) {
    setIsOpen(false);
    if (course?.difficulty != difficulty) {
      await dispatch(
        updateCourseInfoThunk({
          courseId: course?.id,
          payload: { difficulty } as any,
        })
      );
    }
  }

  function Difficulty() {
    if (!course?.difficulty) return null;

    return (
      <span
        onClick={() => setIsOpen(true)}
        className="flex gap-2 items-center cursor-pointer h-8 rounded-[4px] px-[6px] py-1 bg-grey0 hover:bg-grey2 active:bg-grey3"
      >
        <div className="-text-body1 text-grey7 ">{course?.difficulty}</div>
        <div className="w-6 h-6">
          <ArrowDownIcon className="stroke-grey7" />
        </div>
      </span>
    );
  }

  function Dropdown() {
    if (!isOpen) return null;
    var options = ["beginner", "intermediate", "advanced"];

    return (
      <div className="z-10 w-[300px] absolute top-0 left-0 shadow-lg rounded-md">
        <div className="flex flex-col max-w-[calc(-24px+100vw)] min-w-[180px] h-full max-h-[70vh">
          <div className="rounded-md flex flex-col flex-wrap p-1 gap-1 bg-grey1 flex-shrink-0 max-h-[240px] overflow-x-hidden overflow-y-auto">
            {options.map((difficulty) => (
              <div
                key={difficulty}
                onClick={() => updateDifficulty(difficulty)}
                className={`${
                  course?.difficulty == difficulty ? "bg-grey2" : ""
                } cursor-pointer active:bg-grey3 rounded-[4px] flex-shrink px-[6px] py-1 flex items-center hover:bg-grey2 min-w-0`}
              >
                <div
                  className={`flex-shrink -text-body2 text-grey7 whitespace-nowrap overflow-hidden text-ellipsis`}
                >
                  {difficulty}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      className="relative w-[300px] p-1 rounded-md min-h-[44px] flex flex-wrap gap-1"
    >
      <Difficulty />
      <Dropdown />
    </div>
  );
}

export default CourseDifficultyDropdown;
