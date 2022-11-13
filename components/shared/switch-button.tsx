import { useState } from "react";

interface SwitchButtonProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function SwitchButton({ checked, onChange }: SwitchButtonProps) {
  var [isChecked, setIsChecked] = useState(checked);

  function handleClick() {
    setIsChecked(!isChecked);
    onChange(isChecked);
  }

  return (
    <div className="relative max-w-[300px] w-full flex justify-end">
      <div
        onClick={handleClick}
        className="flex justify-between items-center cursor-pointer"
      >
        <div
          className={`w-14 h-8 ${
            !isChecked ? "bg-gray-300" : "bg-blue2"
          }  rounded-full flex-shrink-0 p-1`}
        >
          <div
            className={`bg-white w-6 h-6 rounded-full shadow-md transform ${
              isChecked ? "translate-x-6" : ""
            } duration-300 ease-in-out`}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default SwitchButton;
