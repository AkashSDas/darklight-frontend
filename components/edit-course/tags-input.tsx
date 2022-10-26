import { nanoid } from "nanoid";

import OptionsInput from "@components/dropdown/options-input";
import useDropdown from "@hooks/dropdown";
import { useAppDispatch, useAppSelector } from "@hooks/store";
import { addTag, removeTag, selectEditableCourse } from "@store/editable-course/slice";
import { updateCourseInfoThunk } from "@store/editable-course/thunk";

function CourseTagsInput() {
  var { course } = useAppSelector(selectEditableCourse);
  var dispatch = useAppDispatch();
  var { isOpen, setIsOpen, wrapperRef } = useDropdown();

  async function handleDropdownUnmount(values: string[]) {
    await dispatch(
      updateCourseInfoThunk({ courseId: course?.id, payload: { tags: values } })
    );
  }

  function Tags() {
    return (
      <>
        {(course?.tags ?? [])
          .map((t) => ({ value: t, id: nanoid() }))
          .map((t) => (
            <span
              key={t.id}
              className="h-7 w-max rounded-[4px] flex-shrink px-[6px] py-1 flex items-center bg-grey2 min-w-0"
            >
              <div className="flex-shrink text-[14px] text-grey7 whitespace-nowrap overflow-hidden text-ellipsis">
                {t.value}
              </div>
            </span>
          ))}
      </>
    );
  }

  return (
    <div
      ref={wrapperRef}
      onClick={() => setIsOpen(true)}
      className="relative w-[300px] p-1 rounded-md min-h-[44px] bg-grey0 cursor-pointer hover:bg-grey1 active:bg-grey2 flex flex-wrap gap-1"
    >
      <Tags />

      {isOpen && (
        <OptionsInput
          opts={course?.tags ?? []}
          handleAdd={addTag}
          handleRemove={removeTag}
          onUnmount={handleDropdownUnmount}
        />
      )}
    </div>
  );
}

export default CourseTagsInput;
