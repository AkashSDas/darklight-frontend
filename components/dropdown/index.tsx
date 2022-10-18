import { ReactElement, useRef, useState } from "react";

import { useOutsideAlerter } from "@hooks/outsider-alerter";

interface Props {
  clickable: ReactElement;
  children: ReactElement;
}

function DropDown({ clickable, children }: Props) {
  var [isOpen, setIsOpen] = useState(false);
  var wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, function updateDropdownOnOutsideClick() {
    setIsOpen(false);
  });

  return (
    <div ref={wrapperRef} className="relative">
      <div onClick={() => setIsOpen(!isOpen)}>{clickable}</div>
      {isOpen ? children : null}
    </div>
  );
}

export default DropDown;
