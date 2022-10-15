import { useEffect } from "react";

import { useAppDispatch } from "@hooks/store";
import { getNewAccessTokenThunk } from "@store/auth/thunk";

function BasicAuthPrefetch({ children }) {
  var dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getNewAccessTokenThunk());
  }, [dispatch]);

  return <>{children}</>;
}

export default BasicAuthPrefetch;
