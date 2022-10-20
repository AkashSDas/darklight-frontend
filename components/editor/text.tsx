import debounce from "lodash.debounce";
import { useState } from "react";

import { useResizeTextareaHeight } from "@hooks/resize-textarea-height";

interface Props {
  text?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  size: "h2" | "h3" | "h4" | "body1" | "body2" | "intro";
}

function Text({ size, onChange, placeholder, text }: Props) {
  var [value, setValue] = useState<string | null>(text);
  var { ref } = useResizeTextareaHeight(value);

  var callback = debounce(function debounceCallback(value) {
    onChange && onChange(value);
  }, 500);

  return (
    <textarea
      ref={ref}
      className={`w-full px-[2px] py-[3px] -text-${size} text-grey8 outline-none resize-none placeholder:text-grey5`}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        callback(e.target.value);
      }}
      placeholder={placeholder}
      onKeyPress={(e) => {
        if (e.key == "Enter") e.preventDefault();
      }}
    />
  );
}

export default Text;
