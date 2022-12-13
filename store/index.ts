import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";

import buyCourseReducer from "./buy-course/slice";

var store = configureStore({
  reducer: { buyCourse: buyCourseReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export default store;
