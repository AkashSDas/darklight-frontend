interface Props {
  color?: string;
  size: "24" | "18";
  [key: string]: any;
}

export function RightArrowIcon(props: Props) {
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
          d="m7.5 5.25 3 3.75-3 3.75"
          stroke="#585858"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return null;
}
