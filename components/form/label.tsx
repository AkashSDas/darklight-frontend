import { ReactElement } from "react";

interface Props {
  label: string;
  htmlFor: string;
  rightElement?: ReactElement;
}

function FormLabel({ label, htmlFor, rightElement }: Props) {
  return (
    <label
      htmlFor={htmlFor}
      className="-text-body font-medium flex items-center justify-between"
    >
      <span className="text-grey7">{label}</span>
      {rightElement}
    </label>
  );
}

export default FormLabel;
