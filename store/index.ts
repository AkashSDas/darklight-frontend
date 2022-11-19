import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";
import auth from "@store/auth/slice";
import course from "@store/course/slice";
import user from "@store/user/slice";

/** Redux store */
var store = configureStore({
  reducer: { auth, user, course },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export default store;
