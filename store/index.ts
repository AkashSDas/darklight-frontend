import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";
import _auth from "@store/_auth/slice";
import _user from "@store/_user/slice";
import auth from "@store/auth/slice";
import editableCourse from "@store/editable-course/slice";
import user from "@store/user/slice";

/** Redux store */
var store = configureStore({
  reducer: { user, auth, editableCourse, _auth, _user },
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
