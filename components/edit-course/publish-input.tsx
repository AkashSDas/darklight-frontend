import SwitchButton from "@components/buttons/switch-button";
import { useAppDispatch, useAppSelector } from "@hooks/store";
import { selectEditableCourse } from "@store/editable-course/slice";
import { updateCourseInfoThunk } from "@store/editable-course/thunk";

function PublishCourseInput() {
  var { course } = useAppSelector(selectEditableCourse);
  var dispatch = useAppDispatch();

  async function handleClick() {
    await dispatch(
      updateCourseInfoThunk({
        courseId: course?.id,
        payload: { stage: course?.stage == "draft" ? "published" : "draft" },
      })
    );
  }

  return (
    <SwitchButton
      onClick={handleClick}
      active={course?.stage == "published" ?? false}
    />
  );
}

export default PublishCourseInput;
