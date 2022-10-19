import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function EditableCoursePage({}) {
  var [isLoading, setIsLoading] = useState(true);
  var router = useRouter();

  useEffect(() => {
    if (router.query?.id) setIsLoading(false);
  }, [router.query]);

  return <div>{JSON.stringify(router.query?.id)}</div>;
}

export default EditableCoursePage;
