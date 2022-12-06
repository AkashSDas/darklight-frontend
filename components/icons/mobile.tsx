interface Props {
  color?: string;
  size: "24" | "18";
  [key: string]: any;
}

export function MobileIcon(props: Props) {
  if (props.size == "18") {
    return (
      <svg
        width={18}
        height={18}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <rect
          x={3.75}
          y={1.5}
          width={10.5}
          height={15}
          rx={3}
          stroke="#555"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
        <path
          d="M8.25 14.25h1.5"
          stroke="#555"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return null;
}
