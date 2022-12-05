import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";

import userReducer from "./user/slice";

var store = configureStore({
  reducer: { user: userReducer },
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
