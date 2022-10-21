import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@store/user/slice";

import { RootState } from "../";
import {
  createCourseModuleThunk,
  getCourseModuleThunk,
  getCourseThunk,
} from "./thunk";

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
  coverImage: { id?: string; URL: string } | null;
  modules: Module[];
  faqs: any[];
}

export interface EditableCourseState {
  course: Course | null;
  isUpdating: boolean;
  createLoading: boolean;
  isLoading: boolean;
  activeModule: Module | null;
}

var initialState: EditableCourseState = {
  course: null,
  isUpdating: false,
  createLoading: false,
  isLoading: false,
  activeModule: null,
};

export const editableCourseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourse(state, action: PayloadAction<Course | null>) {
      state.course = action.payload;
    },
    addTag(state, action: PayloadAction<string>) {
      state.course?.tags.push(action.payload);
    },
    removeTag(state, action: PayloadAction<string>) {
      if (state.course) {
        state.course.tags = state.course.tags.filter(
          (tag) => tag != action.payload
        );
      }
    },
    addModule(state, action: PayloadAction<Module>) {
      state.course?.modules.push(action.payload);
    },
    setModule(state, action: PayloadAction<Module>) {
      state.activeModule = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Getting course
    builder.addCase(getCourseThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getCourseThunk.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(getCourseThunk.rejected, (state, action) => {
      state.isLoading = false;
    });

    // Add module
    builder.addCase(createCourseModuleThunk.pending, (state, action) => {
      state.isUpdating = true;
    });
    builder.addCase(createCourseModuleThunk.fulfilled, (state, action) => {
      state.isUpdating = false;
    });
    builder.addCase(createCourseModuleThunk.rejected, (state, action) => {
      state.isUpdating = false;
    });

    // Fetch module
    builder.addCase(getCourseModuleThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getCourseModuleThunk.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(getCourseModuleThunk.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export var { setCourse, addTag, removeTag } = editableCourseSlice.actions;
export var { addModule, setModule } = editableCourseSlice.actions;
export var selectEditableCourse = (state: RootState) => state.editableCourse;
export var editableCourseSliceName = editableCourseSlice.name;
export default editableCourseSlice.reducer;
