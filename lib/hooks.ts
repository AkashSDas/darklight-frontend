import { MutableRefObject, useEffect, useRef, useState } from "react";

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
