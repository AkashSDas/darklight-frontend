import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import useSWR, { useSWRConfig } from "swr";

import { getNewAccessToken } from "../services/auth.service";
import { getEditableCourse } from "../services/course.service";
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
  return {
    success: data?.success,
    user: data?.user,
    error: error,
    accessToken,
  };
}

export function useEditableCourse() {
  var router = useRouter();
  var courseId = router.query.courseId as string;
  var { data, error, mutate, isValidating } = useSWR(courseId, () =>
    getEditableCourse(courseId)
  );

  return {
    loading: !data && !error,
    course: data?.course,
    success: data?.success,
    error,
    mutateCourse: mutate,
    isValidating,
    courseId,
  };
}

/// Similar situation was faced in `editor-mode-0` in post_form.tsx
export function useResizeTextareaHeight(
  value: string,
  solveScrollIssue?: boolean
) {
  // Resize textarea height dynamically
  //
  // NOTE: If you've a case where your textarea is mounting & unmounting
  // but not your main component where you've defined this hook then extract
  // textarea into separate hook and that way you can use the lifecycle
  // events (mounting and unmounting) of the textarea and not the top component
  // where this hook is defined. If you don't do this then textare if
  // having default `value` will have height that'll fit the content but as
  // the textarea is unmounted (not the top component where this hook is defined)
  // and then mounted again, now the height will be default textarea height and
  // this might not fit your content and then you've to scroll.

  var ref = useRef<any>(null);

  // Whenever the value updates the height will update
  useEffect(() => {
    ref.current.style.height = "0px";
    const scrollHeight = ref.current.scrollHeight;
    ref.current.style.height = scrollHeight + "px";

    // this solves the issue of jumps when the height changes
    // so the problem is when you enter value in between then
    // the textarea will scroll and cursor (where you want to
    // enter something will be at bottom of the screen). To
    // solve those jump issues below code is used which keep the
    // cursor position intact even if the height of textarea is
    // changing. There is no change in position as we scroll the
    // window and default scroll is in opposite direction so
    // both of them cancel each other
    //
    // this is the solution of ContentEditor textareas where
    // content is edited, to avoid jumps while writing this
    // solution is used
    //
    // Since this issue needed to be solved for one specific case
    // i.e. ContentEditor, therefore solveScrollIssue param is used
    //
    // Stackoverflow post: https://stackoverflow.com/a/24958072
    if (solveScrollIssue && typeof window !== "undefined") {
      window.scrollTo(
        ref.current.scrollLeft,
        ref.current.scrollTop + ref.current.scrollHeight
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return { ref };
}
