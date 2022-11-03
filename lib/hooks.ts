import { useRouter } from "next/router";
import { MutableRefObject, useEffect, useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "@hooks/store";
import { selectCourse } from "@store/_course/slice";
import { getCourseThunk, getLessonThunk, getModuleThunk } from "@store/_course/thunk";

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

/**
 *Resize textarea height dynamically
 *
 *NOTE: If you've a case where your textarea is mounting & unmounting
 *but not your main component where you've defined this hook then extract
 *textarea into separate hook and that way you can use the lifecycle
 *events (mounting and unmounting) of the textarea and not the top component
 *where this hook is defined. If you don't do this then textare if
 *having default `value` will have height that'll fit the content but as
 *the textarea is unmounted (not the top component where this hook is defined)
 *and then mounted again, now the height will be default textarea height and
 *this might not fit your content and then you've to scroll.
 */
export function useResizeTextareaHeight(
  value: string,
  solveScrollIssue?: boolean
) {
  const ref = useRef(null);

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
  }, [value, solveScrollIssue]);

  return { ref };
}

export function useCourse() {
  var router = useRouter();
  var dispatch = useAppDispatch();
  var courseId = router.query.cid as string;
  var { loading, course } = useAppSelector(selectCourse);

  useEffect(
    function getCourse() {
      if (!course && courseId) {
        dispatch(getCourseThunk(courseId));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [courseId, dispatch]
  );

  return { loading, course, courseId };
}

export function useModule() {
  var router = useRouter();
  var dispatch = useAppDispatch();
  var courseId = router.query.cid as string;
  var moduleId = router.query.mid as string;
  var { moduleLoading, course } = useAppSelector(selectCourse);

  useEffect(
    function getModule() {
      if (!course && courseId && moduleId) {
        dispatch(getModuleThunk({ courseId, moduleId }));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [courseId, dispatch, moduleId]
  );

  return { moduleLoading, moduleId, courseId };
}

export function useLesson() {
  var router = useRouter();
  var dispatch = useAppDispatch();
  var courseId = router.query.cid as string;
  var moduleId = router.query.mid as string;
  var lessonId = router.query.mid as string;
  var { lessonLoading, course } = useAppSelector(selectCourse);

  useEffect(
    function getLesson() {
      if (!course && courseId && moduleId && lessonId) {
        dispatch(getLessonThunk({ courseId, moduleId, lessonId }));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [courseId, dispatch, lessonId, moduleId]
  );

  return { lessonLoading, lessonId, moduleId, courseId };
}
