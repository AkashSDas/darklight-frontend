import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@store/_user/slice";

import { RootState } from "../";

export interface Lesson {
  id: string;
  emoji?: string;
  title?: string;
  description?: string;
  video: { id?: string; URL: string } | null;
  content: any[];
  lastEditedOn: string;
  isFree: boolean;
  qna: any[];
  attachments: any[];
}

export interface Module {
  id: string;
  emoji?: string;
  title?: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  emoji?: string;
  title?: string;
  description?: string;
  lastEditedOn: string;
  stage: "draft" | "published";
  instructors: User[];
  price: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  tags: string[];
  coverImage?: { id?: string; URL: string } | null;
  modules: Module[];
  faqs: any[];
}

interface CourseState {
  course: Course | null;
  upading: boolean;
  loading: boolean;
  activeModuleId?: string | null;
  activeLessonId?: string | null;
}

var initialState: CourseState = {
  course: null,
  upading: false,
  loading: false,
  activeModuleId: null,
  activeLessonId: null,
};

export var courseSlice = createSlice({
  name: "_course",
  initialState,
  reducers: {
    updateCourse(state, action: PayloadAction<Course>) {
      state.course = action.payload;
    },
    updateActiveModuleId(state, action: PayloadAction<string>) {
      state.activeModuleId = action.payload;
    },
    updateActiveLessonId(state, action: PayloadAction<string>) {
      state.activeLessonId = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export var { updateCourse, updateActiveLessonId, updateActiveModuleId } =
  courseSlice.actions;

export var selectCourse = (state: RootState) => state._course;
export var selectCourseData = (state: RootState) => state._course.course;
export var selectCourseLoading = (state: RootState) => state._course.loading;

export var courseSliceName = courseSlice.name;
export default courseSlice.reducer;
