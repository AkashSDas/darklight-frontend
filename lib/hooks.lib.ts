import { useRouter } from "next/router";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import useSWR, { useSWRConfig } from "swr";

import { getNewAccessToken } from "../services/auth.service";
import { getCourse, getEditableCourse } from "../services/course.service";
import { getLesson } from "../services/lesson.service";
import { me } from "../services/user.service";
import { AppDispatch, RootState } from "../store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// TODO: Logout user when refresh token has expired
export var useAppDispatch = () => useDispatch<AppDispatch>();
export var useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useAccessToken() {
  var { data, error, isLoading, mutate } = useSWR(
    "new-access-token",
    getNewAccessToken,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      refreshInterval(_latestData) {
        return 30 * 60 * 1000; // Refresh every 30 minutes (access token expires in 30mins)
      },
    }
  );

  return {
    error,
    isLoading,
    success: data?.success,
    accessToken: data?.accessToken,
    user: data?.user,
    mutateAccessToken: mutate,
  };
}

/** This hook handles getting user logged in using JWT OR an OAuth provider */
export function useUser() {
  var token = useAccessToken();

  // Make request only if the useAccessToken has failed to get user
  // that would only mean either the user has signed up using OAuth OR the user has not signed up
  var { data, error, isLoading, mutate } = useSWR(
    "user",
    () => (!token.success ? me(token.accessToken) : null),
    { shouldRetryOnError: false, revalidateOnFocus: false }
  );

  useEffect(
    // This is for users who have logged in using OAuth providers (in that case they don't have access token)
    // Error indicates that the user is not logged in using access token
    function refetchUserWithNoAccessToken() {
      if (!token.accessToken && !token.isLoading && token.error) mutate();
    },
    [token.accessToken, mutate, token.isLoading, token.error]
  );

  return {
    error: error || token.error,
    isLoading: isLoading || token.isLoading,
    success: data?.success || token.success,
    user: data?.user || token.user,
    mutateUser: mutate,
    mutateAccessToken: token.mutateAccessToken,
    accessToken: token.accessToken,
  };
}

export function useEditableCourse() {
  var router = useRouter();
  var courseId = router.query.courseId as string;
  var { data, error, mutate, isValidating } = useSWR(
    ["edit-course", courseId],
    () => getEditableCourse(courseId),
    { revalidateOnFocus: false }
  );

  return {
    loading: !data || !error,
    course: data?.course,
    success: data?.success,
    error,
    mutateCourse: mutate,
    isValidating,
    courseId,
  };
}

export function useEditableGroup() {
  var router = useRouter();
  var groupId = router.query.groupId as string;
  var { course, loading: courseLoading, mutateCourse } = useEditableCourse();

  return {
    group: course?.groups.find((group: any) => group._id == groupId),
    courseLoading,
    mutateCourse,
    courseId: course?._id,
  };
}

export function useEditableLesson() {
  var router = useRouter();
  var lessonId = router.query.lessonId as string;

  var { courseId, group } = useEditableGroup();
  var { accessToken } = useUser();

  var { data, error, mutate, isValidating } = useSWR(
    accessToken ? [courseId, group?._id] : null,
    () => getLesson(courseId, group._id, lessonId, accessToken),
    { revalidateOnFocus: false }
  );

  return {
    loading: !data && !error,
    lesson: data?.lesson,
    success: data?.success,
    error,
    mutateLesson: mutate,
    isValidating,
    courseId,
    groupId: group?._id,
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

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useOutsideAlerter(
  ref: MutableRefObject<any>,
  onOutsideClick: Function
) {
  useEffect(
    function alertOnOutsideClick() {
      function handleOutsideClick(event: MouseEvent) {
        // Outside click
        if (ref.current && !ref.current.contains(event.target)) {
          onOutsideClick();
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleOutsideClick);

      return function unbindEvent() {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    },
    [ref, onOutsideClick]
  );
}

/**
 * Hook for managing dropdown state (outside click, open/close)
 */
export function useDropdown() {
  var wrapperRef = useRef(null);
  var [isOpen, setIsOpen] = useState(false);

  useOutsideAlerter(wrapperRef, function updateDropdownOnOutsideClick() {
    setIsOpen(false);
  });

  return { wrapperRef, isOpen, setIsOpen };
}

export function useBuyCourse() {
  var router = useRouter();
  var { data, error } = useSWR(
    router.query?.id ? `get-course/${router.query?.id}` : null,
    () => getCourse(router.query.id as string)
  );

  function getMainInfo() {
    if (data?.course) {
      let c = data.course;
      return {
        difficulty: c.difficulty,
        tags: c.tags,
        enrolled: c.enrolled,
        rating: c.rating,
        price: c.price,
        title: c.title,
        description: c.description,
        lastEditedOn: c.lastEditedOn,
        emoji: c.emoji,
        coverImageURL: c.coverImage?.URL,
      };
    }
    return null;
  }

  return {
    loading: !data && !error,
    course: data?.course,
    info: getMainInfo(),
    instructors: data?.course?.instructors,
    groups: data?.course?.groups,
    success: data?.success,
    error: data?.error || error,
  };
}
