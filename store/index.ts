import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";
import userReducer from "@store/user/slice";

/** Redux store */
var store = configureStore({
  reducer: {
    user: userReducer,
  },
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
