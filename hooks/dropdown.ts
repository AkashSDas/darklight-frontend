import { useRef, useState } from "react";

import { useOutsideAlerter } from "./outsider-alerter";

function useDropdown() {
  var wrapperRef = useRef(null);
  var [isOpen, setIsOpen] = useState(false);

  useOutsideAlerter(wrapperRef, function updateDropdownOnOutsideClick() {
    setIsOpen(false);
  });

  return { wrapperRef, isOpen, setIsOpen };
}

export default useDropdown;
