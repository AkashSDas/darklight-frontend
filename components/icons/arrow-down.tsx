interface Props {
  color?: string;
  size: "24" | "18" | "20";
  [key: string]: any;
}

export function ArrowDownIcon(props: Props) {
  if (props.size == "20") {
    return (
      <svg
        width={20}
        height={20}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M14.167 8.333 10 11.667 5.833 8.333"
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
