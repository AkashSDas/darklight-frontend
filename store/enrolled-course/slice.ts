import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface EnrolledCourseState {
  breadcrum: {
    group?: { _id: string; emoji: string; title: string };
    lesson?: { _id: string; emoji: string; title: string };
  };
  dropdownContext: "course" | "group" | "lesson" | null;
}

export var initialState: EnrolledCourseState = {
  breadcrum: { group: undefined, lesson: undefined },
  dropdownContext: "lesson",
};

export const enrolledCourseSlice = createSlice({
  name: "enrolled-course",
  initialState,
  reducers: {
    setBreadcrum: (
      state,
      action: PayloadAction<typeof initialState["breadcrum"]>
    ) => {
      state.breadcrum = { ...state.breadcrum, ...action.payload };
    },
    setDropdownContext(
      state,
      action: PayloadAction<typeof initialState["dropdownContext"]>
    ) {
      state.dropdownContext = action.payload;
    },
  },
});

export var { setBreadcrum: setLessonBreadcrum, setDropdownContext } =
  enrolledCourseSlice.actions;

export default enrolledCourseSlice.reducer;
