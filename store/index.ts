import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";
import auth from "@store/auth/slice";
import _course from "@store/course/slice";
import _user from "@store/user/slice";

/** Redux store */
var store = configureStore({
  reducer: { auth, _user, _course },
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
