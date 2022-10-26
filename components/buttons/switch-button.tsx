import { useState } from "react";

interface Props {
  onClick?: Function;
  active?: boolean;
}

function SwitchButton(props: Props) {
  var [active, setActive] = useState(props.active ?? false);

  function handleClick() {
    setActive(!active);
    if (props.onClick) props.onClick();
  }

  return (
    <div
      onClick={handleClick}
      className="flex justify-between items-center cursor-pointer"
    >
      <div
        className={`w-14 h-8 ${
          !active ? "bg-gray-300" : "bg-blue2"
        }  rounded-full flex-shrink-0 p-1`}
      >
        <div
          className={`bg-white w-6 h-6 rounded-full shadow-md transform ${
            active ? "translate-x-6" : ""
          } duration-300 ease-in-out`}
        ></div>
      </div>
    </div>
  );
}

export default SwitchButton;
