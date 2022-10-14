import { useEffect } from "react";

import { useAppDispatch } from "@hooks/store";
import { getUserOAuthInfoThunk } from "@store/user/thunk";

function OAuthPrefetch({ children }) {
  var dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserOAuthInfoThunk());
  }, [dispatch]);

  return <>{children}</>;
}

export default OAuthPrefetch;
