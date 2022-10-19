import { createSlice } from "@reduxjs/toolkit";
import { User } from "@store/user/slice";

export interface CourseLesson {
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
  description?: string;
  lessons: CourseLesson[];
}

interface Course {
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
  coverImage: { id?: string; URL: string } | null;
  modules: Module[];
  faqs: any[];
}

export interface EditableCourseState {
  course: Course | null;
  isUpdating: boolean;
}

var initialState: EditableCourseState = {
  course: null,
  isUpdating: false,
};

export const editableCourseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export var {} = editableCourseSlice.actions;
export var editableCourseSliceName = editableCourseSlice.name;
export default editableCourseSlice.reducer;
