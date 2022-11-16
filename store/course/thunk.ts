import { AxiosRequestConfig } from "axios";
import toast from "react-hot-toast";
import fetchAPI from "services";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "../";
import { addNewLessonToModule, Course, Module, rmLessonFromModule, rmModule, updateActiveLesson, updateActiveModule, updateActiveModuleId, updateCourse } from "./slice";

function fetchFromCourse(endpoint: string, opts: AxiosRequestConfig) {
  const BASE_URL = "/course";
  return fetchAPI(`${BASE_URL}${endpoint}`, opts);
}

// ==================================
// Course Thunks
// ==================================

export var getCourseThunk = createAsyncThunk(
  "_course/get",
  async function (id: string, { getState, dispatch }) {
    var state = getState() as RootState;

    var res = await fetchFromCourse(`/${id}`, { method: "get" });
    if (res.status < 300) {
      dispatch(updateCourse(res.data as any));
      return res.data.id;
    } else {
      toast.error(res.msg);
      return null;
    }
  }
);

export var createCourseThunk = createAsyncThunk(
  "_course/create",
  async function (_, { getState, dispatch }) {
    var state = getState() as RootState;

    var res = await fetchFromCourse("", {
      method: "post",
      headers: {
        Authorization: `Bearer ${state._auth.accessToken}`,
      },
    });

    if (res.status < 300 && res.data) {
      toast.success("Course created!");
      dispatch(updateCourse(res.data as any));
      return res.data.id;
    }

    toast.error(res.msg);
    return null;
  }
);

export var updateCourseInfoThunk = createAsyncThunk(
  "_course/update-info",
  async function (
    {
      id,
      data,
    }: {
      id: string;
      data: Partial<{
        emoji: Course["emoji"];
        title: Course["title"];
        description: Course["description"];
        tags: Course["tags"];
        stage: Course["stage"];
        price: Course["price"];
        difficulty: Course["difficulty"];
      }>;
    },
    { getState, dispatch }
  ) {
    var state = getState() as RootState;

    await fetchFromCourse(`/${id}/info`, {
      method: "put",
      headers: { Authorization: `Bearer ${state._auth.accessToken}` },
      data,
    });
  }
);

export var deleteCourseThunk = createAsyncThunk(
  "_course/delete",
  async function deleteCourse(_, { getState, dispatch }) {
    var state = getState() as RootState;
    var { accessToken } = state._auth;
    var { course } = state._course;

    if (accessToken) {
      var res = await fetchFromCourse(`/${course.id}`, {
        method: "delete",
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (res.status < 300) {
        toast.success("Course deleted!");
        dispatch(updateCourse(null));
        dispatch(updateActiveModule(null));
        dispatch(updateActiveLesson(null));
        return true;
      } else {
        toast.error(res.msg);
        return false;
      }
    } else {
      toast.error("You are not logged in!");
      return false;
    }
  }
);

// ==================================
// Module Thunks
// ==================================

export var getModuleThunk = createAsyncThunk(
  "_course/module/get",
  async function (
    { courseId, moduleId }: { courseId: string; moduleId: string },
    { getState, dispatch }
  ) {
    var state = getState() as RootState;
    var res = await fetchFromCourse(`/${courseId}/${moduleId}`, {
      method: "get",
    });

    if (res.status < 300 && res.data) {
      dispatch(updateActiveModuleId(res.data.id as any));
      return res.data.id;
    }
  }
);

export var createModuleThunk = createAsyncThunk(
  "_course/module/create",
  async function (id: string, { getState, dispatch }) {
    var state = getState() as RootState;
    var { accessToken } = state._auth;
    var { course } = state._course;

    if (accessToken) {
      var res = await fetchFromCourse(`/${course.id}`, {
        method: "post",
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (res.status < 300 && res.data) {
        toast.success("Module created!");

        dispatch(
          updateCourse({
            ...course,
            modules: [...course?.modules, res.data],
          } as any)
        );

        return res.data.id;
      } else {
        toast.error(res.msg);
        return null;
      }
    } else {
      toast.error("You are not logged in!");
      return null;
    }
  }
);

export var updateModuleThunk = createAsyncThunk(
  "_course/module/update",
  async function (
    {
      courseId,
      moduleId,
      data,
    }: {
      courseId: string;
      moduleId: string;
      data: Partial<{
        emoji: Module["emoji"];
        title: Module["title"];
        description: Module["description"];
        lessons: Module["lessons"] | string[];
      }>;
    },
    { getState, dispatch }
  ) {
    var state = getState() as RootState;
    var { accessToken } = state._auth;

    if (accessToken) {
      await fetchFromCourse(`/${courseId}/${moduleId}`, {
        method: "put",
        headers: { Authorization: `Bearer ${accessToken}` },
        data,
      });
    } else {
      toast.error("You are not logged in!");
      return null;
    }
  }
);

export var reorderModulesThunk = createAsyncThunk(
  "_course/module/reorder",
  async function (
    { courseId, modules }: { courseId: string; modules: Module[] },
    { getState, dispatch }
  ) {
    var state = getState() as RootState;
    var { accessToken } = state._auth;

    if (accessToken) {
      await fetchFromCourse(`/${courseId}/reorder`, {
        method: "put",
        headers: { Authorization: `Bearer ${accessToken}` },
        data: {
          modules: modules.map((m) => ({
            ...m,
            lessons: m.lessons.map((l) => l.id),
          })),
        },
      });
    } else {
      toast.error("You are not logged in!");
      return null;
    }
  }
);

export var deleteModuleThunk = createAsyncThunk(
  "_course/module/delete",
  async function (_, { getState, dispatch }) {
    var state = getState() as RootState;
    var { accessToken } = state._auth;
    var { course, activeModuleId } = state._course;

    if (accessToken) {
      let res = await fetchFromCourse(`/${course.id}/${activeModuleId}`, {
        method: "delete",
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (res.status < 300) {
        toast.success("Module deleted!");

        dispatch(rmModule({ moduleId: activeModuleId }));
        dispatch(updateActiveModule(null));
        return true;
      }
    } else {
      toast.error("You are not logged in!");
    }

    return false;
  }
);

// ==================================
// Lesson Thunks
// ==================================

export var createLessonThunk = createAsyncThunk(
  "_course/lesson/create",
  async function (
    { courseId, moduleId }: { courseId: string; moduleId: string },
    { getState, dispatch }
  ) {
    var state = getState() as RootState;
    var { accessToken } = state._auth;

    if (accessToken) {
      var res = await fetchFromCourse(`/${courseId}/${moduleId}`, {
        method: "post",
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (res.status < 300 && res.data) {
        toast.success("Lesson created!");
        dispatch(updateActiveLesson(res.data as any));
        dispatch(addNewLessonToModule(res.data.id));
        return res.data;
      } else {
        toast.error(res.msg);
        return null;
      }
    } else {
      toast.error("You are not logged in!");
      return null;
    }
  }
);

export var getLessonThunk = createAsyncThunk(
  "_course/lesson/get",
  async function (
    {
      courseId,
      moduleId,
      lessonId,
    }: { courseId: string; moduleId: string; lessonId: string },
    { getState, dispatch }
  ) {
    var state = getState() as RootState;

    var lesson = await fetchFromCourse(`/${courseId}/${moduleId}/${lessonId}`, {
      method: "get",
    });

    if (lesson.status < 300 && lesson.data) {
      dispatch(updateActiveLesson(lesson.data as any));
      return lesson.data.id;
    }

    return null;
  }
);

export var updateLessonMetadataThunk = createAsyncThunk(
  "_course/lesson/metadata",
  async function (_, { getState, dispatch }) {
    var state = getState() as RootState;
    var { accessToken } = state._auth;
    var { course, activeModuleId, activeLesson } = state._course;

    if (accessToken) {
      await fetchFromCourse(
        `/${course.id}/${activeModuleId}/${activeLesson.id}/metadata`,
        {
          method: "put",
          headers: { Authorization: `Bearer ${accessToken}` },
          data: {
            title: activeLesson.title,
            description: activeLesson.description,
            isFree: activeLesson.isFree,
            emoji: activeLesson.emoji,
          },
        }
      );
    } else {
      toast.error("You are not logged in!");
      return null;
    }
  }
);

export var deleteLessonThunk = createAsyncThunk(
  "_course/lesson/delete",
  async function (_, { getState, dispatch }) {
    var state = getState() as RootState;
    var { accessToken } = state._auth;
    var { course, activeModuleId, activeLesson } = state._course;

    if (accessToken) {
      let res = await fetchFromCourse(
        `/${course.id}/${activeModuleId}/${activeLesson.id}/delete`,
        {
          method: "delete",
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (res.status < 300) {
        toast.success("Lesson deleted");
        dispatch(rmLessonFromModule({ lessonId: activeLesson.id }));
        dispatch(updateActiveLesson(null));
        return true;
      } else toast.error(res.msg);
    } else toast.error("You are not logged in!");

    return false;
  }
);

// ==================================
// Content Thunks
// ==================================

export var addContentThunk = createAsyncThunk(
  "_course/content/add",
  async function (
    data: { type: string; data: any; addAt: number },
    { getState, dispatch }
  ) {
    var state = getState() as RootState;
    var { accessToken } = state._auth;
    var { course, activeModuleId, activeLesson } = state._course;

    if (accessToken) {
      let res = await fetchFromCourse(
        `/${course.id}/${activeModuleId}/${activeLesson.id}`,
        {
          method: "post",
          headers: { Authorization: `Bearer ${accessToken}` },
          data,
        }
      );

      if (res.status < 300) {
        // TODO: fix last edited on
        dispatch(
          updateActiveLesson({
            ...activeLesson,
            lastEditedOn: Date.now(),
          } as any)
        );
      } else toast.error(res.msg);
    } else {
      toast.error("You are not logged in!");
    }
  }
);

export var updateContentThunk = createAsyncThunk(
  "_course/content/update",
  async function (
    data: { type: string; data: any; updateAt: number },
    { getState, dispatch }
  ) {
    var state = getState() as RootState;
    var { accessToken } = state._auth;
    var { course, activeModuleId, activeLesson } = state._course;

    if (accessToken) {
      await fetchFromCourse(
        `/${course.id}/${activeModuleId}/${activeLesson.id}`,
        {
          method: "put",
          headers: { Authorization: `Bearer ${accessToken}` },
          data,
        }
      );
    } else {
      toast.error("You are not logged in!");
    }
  }
);

export var deleteContentThunk = createAsyncThunk(
  "_course/content/delete",
  async function (data: { deleteAt: number }, { getState, dispatch }) {
    var state = getState() as RootState;
    var { accessToken } = state._auth;
    var { course, activeModuleId, activeLesson } = state._course;

    if (accessToken) {
      await fetchFromCourse(
        `/${course.id}/${activeModuleId}/${activeLesson.id}`,
        {
          method: "delete",
          headers: { Authorization: `Bearer ${accessToken}` },
          data,
        }
      );
    } else {
      toast.error("You are not logged in!");
    }
  }
);

export var reorderContentThunk = createAsyncThunk(
  "_course/content/reorder",
  async function (data: { content: any }, { getState, dispatch }) {
    var state = getState() as RootState;
    var { accessToken } = state._auth;
    var { course, activeModuleId, activeLesson } = state._course;

    if (accessToken) {
      await fetchFromCourse(
        `/${course.id}/${activeModuleId}/${activeLesson.id}/reorder`,
        {
          method: "put",
          headers: { Authorization: `Bearer ${accessToken}` },
          data,
        }
      );
    } else {
      toast.error("You are not logged in!");
    }
  }
);
