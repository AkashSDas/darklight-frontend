import { useFormik } from "formik";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@hooks/store";
import { selectEditableCourse } from "@store/editable-course/slice";
import { updateCourseInfoThunk } from "@store/editable-course/thunk";

function CoursePriceInput() {
  var { course } = useAppSelector(selectEditableCourse);
  var dispatch = useAppDispatch();

  var formik = useFormik({
    initialValues: { price: course?.price },
    onSubmit: async (values) => {
      await dispatch(
        updateCourseInfoThunk({
          courseId: course?.id,
          payload: { price: values.price },
        })
      );
    },
  });

  useEffect(
    function updatePrice() {
      formik.setFieldValue("price", course?.price);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [course?.price]
  );

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        className="w-full px-3 py-2 border border-grey3 rounded-md text-grey8"
        name="price"
        type="number"
        placeholder="₹0"
        autoComplete="off"
        value={formik.values.price}
        onChange={formik.handleChange}
        min={0}
      />
    </form>
  );
}

export default CoursePriceInput;
