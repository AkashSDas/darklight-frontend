import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@store/_user/slice";

import { RootState } from "../";
import { updateCourseInfoThunk, updateModuleThunk } from "./thunk";

export interface Lesson {
  id: string;
  emoji?: string;
  title?: string;
  description?: string;
  video: { id?: string; URL: string } | null;
  contents: any[];
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
  updating: boolean;
  loading: boolean;
  moduleLoading: boolean;
  lessonLoading: boolean;
  activeModuleId?: string | null;
  activeLesson?: Lesson | null;
  previewLesson: boolean;
}

var initialState: CourseState = {
  course: null,
  updating: false,
  loading: false,
  moduleLoading: false,
  lessonLoading: false,
  activeModuleId: null,
  activeLesson: null,
  previewLesson: false,
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
    updatePreview(state, action: PayloadAction<boolean>) {
      state.previewLesson = action.payload;
    },
    updateLessonInModule(
      state,
      action: PayloadAction<{ lesson: Lesson; moduleId: string }>
    ) {
      var { moduleId, lesson } = action.payload;
      var moduleData = state.course?.modules.find((m) => m.id === moduleId);
      if (moduleData) {
        var lessons = moduleData.lessons.map((l) => {
          if (l.id === lesson.id) return lesson;
          else return l;
        });
        moduleData.lessons = lessons;
      }
    },
    deleteContent(state, action: PayloadAction<{ deleteAt: number }>) {
      var { deleteAt } = action.payload;
      var activeLesson = state.activeLesson;
      if (activeLesson) {
        activeLesson.contents.splice(deleteAt, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateCourseInfoThunk.pending, (state) => {
      state.updating = true;
    });
    builder.addCase(updateCourseInfoThunk.fulfilled, (state) => {
      state.updating = false;
    });
    builder.addCase(updateCourseInfoThunk.rejected, (state) => {
      state.updating = false;
    });

    builder.addCase(updateModuleThunk.pending, (state) => {
      state.updating = true;
    });
    builder.addCase(updateModuleThunk.fulfilled, (state) => {
      state.updating = false;
    });
    builder.addCase(updateModuleThunk.rejected, (state) => {
      state.updating = false;
    });
  },
});

export var {
  updateCourse,
  updateActiveLesson,
  updateActiveModuleId,
  updateActiveModule,
  addNewLessonToModule,
  updatePreview,
  updateLessonInModule,
  deleteContent,
} = courseSlice.actions;

export var selectCourse = (state: RootState) => state._course;
export var selectCourseData = (state: RootState) => state._course.course;
export var selectCourseLoading = (state: RootState) => state._course.loading;
export var selectPreview = (state: RootState) => state._course.previewLesson;
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
