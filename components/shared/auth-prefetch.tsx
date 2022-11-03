import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@hooks/store";
import { selectInitLoading } from "@store/_auth/slice";
import { getLoggedInUserThunk, getNewAccessTokenThunk } from "@store/_auth/thunk";

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
