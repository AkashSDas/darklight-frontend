import { useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import useSWR, { useSWRConfig } from "swr";

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
    user: data?.user,
  };
}

export function useUser() {
  var { accessToken } = useAccessToken();
  var { mutate } = useSWRConfig();

  useEffect(
    function refetchUserForAccessToken() {
      if (accessToken) mutate("user");
    },
    [mutate, accessToken]
  );

  var { data, error } = useSWR("user", () => me(accessToken), {});
  return { success: data?.success, user: data?.user, error: error };
}
