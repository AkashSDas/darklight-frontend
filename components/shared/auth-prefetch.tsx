import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { selectInitLoading } from "@store/auth/slice";
import { getLoggedInUserThunk, getNewAccessTokenThunk } from "@store/auth/thunk";

export default function AuthPrefetch({ children }) {
  var dispatch = useAppDispatch();
  var loading = useAppSelector(selectInitLoading);

  useEffect(
    function getUser() {
      // If user has logged in using email-password
      dispatch(getNewAccessTokenThunk());

      // If user has logged in using OAuth
      dispatch(getLoggedInUserThunk());
    },
    [dispatch]
  );

  if (loading) return <div>Loading...</div>;

  return children;
}
