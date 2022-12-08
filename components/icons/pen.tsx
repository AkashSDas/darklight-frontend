interface Props {
  color?: string;
  size: "24" | "18" | "20";
  [key: string]: any;
}

export function PenIcon(props: Props) {
  if (props.size == "18") {
    return (
      <svg
        width={18}
        height={18}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M9.75 10.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm0 0v6M6 4.5h7.5a1.5 1.5 0 0 0 0-3H6a1.5 1.5 0 1 0 0 3Zm-.006 0h7.512l1.285 3.996c.373.941.241 1.99-.355 2.827l-3.972 4.822c-.338.474-1.09.474-1.428 0l-3.972-4.822a2.958 2.958 0 0 1-.356-2.827L5.994 4.5Z"
          stroke="#555"
          strokeWidth={1.5}
        />
      </svg>
    );
  }

  return null;
}
