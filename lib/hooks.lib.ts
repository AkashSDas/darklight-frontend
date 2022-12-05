import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import useSWR from "swr";

import { getNewAccessToken } from "../services/auth.service";
import { me } from "../services/user.service";
import { AppDispatch, RootState } from "../store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export var useAppDispatch = () => useDispatch<AppDispatch>();
export var useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useAccessToken() {
  var { data, error } = useSWR("access-token", getNewAccessToken, {});
  return {
    success: data?.success,
    accessToken: data?.accessToken,
    error: error,
  };
}

export function useUser() {
  var { data, error } = useSWR("user", me, {});
  return { success: data?.success, user: data?.user, error: error };
}
