import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export var useAppDispatch = () => useDispatch<AppDispatch>();
export var useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
