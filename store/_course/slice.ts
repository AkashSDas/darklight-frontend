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
  lastEditedOn: string;
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
  moduleLoading: boolean;
  lessonLoading: boolean;
  activeModuleId?: string | null;
  activeLesson?: Lesson | null;
}

var initialState: CourseState = {
  course: null,
  upading: false,
  loading: false,
  moduleLoading: false,
  lessonLoading: false,
  activeModuleId: null,
  activeLesson: null,
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
    updateActiveModule(state, action: PayloadAction<Module>) {
      var moduleData = action.payload;
      var modules = state.course?.modules.map((m) => {
        if (m.id === moduleData.id) return moduleData;
        else return m;
      });
      if (modules) state.course.modules = modules;
    },
    updateActiveLesson(state, action: PayloadAction<Lesson>) {
      state.activeLesson = action.payload;
    },
    addNewLessonToModule(
      state,
      action: PayloadAction<{ moduleId: string; lesson: Lesson }>
    ) {
      var { moduleId, lesson } = action.payload;
      var moduleData = state.course?.modules.find((m) => m.id === moduleId);
      if (moduleData) moduleData.lessons.push(lesson);
    },
  },
  extraReducers: (builder) => {},
});

export var {
  updateCourse,
  updateActiveLesson,
  updateActiveModuleId,
  updateActiveModule,
  addNewLessonToModule,
} = courseSlice.actions;

export var selectCourse = (state: RootState) => state._course;
export var selectCourseData = (state: RootState) => state._course.course;
export var selectCourseLoading = (state: RootState) => state._course.loading;
export var selectActiveLesson = (state: RootState) =>
  state._course.activeLesson;
export var selectModuleLoading = (state: RootState) =>
  state._course.moduleLoading;
export var selectLessonLoading = (state: RootState) =>
  state._course.lessonLoading;
export var selectActiveModule = (state: RootState) =>
  state._course.course?.modules.find(
    (module) => module.id === state._course.activeModuleId
  );

export var courseSliceName = courseSlice.name;
export default courseSlice.reducer;
