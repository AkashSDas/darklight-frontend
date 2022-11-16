import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";
import _course from "@store/_course/slice";
import _user from "@store/_user/slice";
import _auth from "@store/auth/slice";

/** Redux store */
var store = configureStore({
  reducer: { _auth, _user, _course },
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
