interface Props {
  color?: string;
  size: "24" | "18";
  [key: string]: any;
}

export function TableIcon(props: Props) {
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
          d="M9 2.25h2.75a4 4 0 0 1 4 4v.368M9 2.25H6.25a4 4 0 0 0-4 4v.368M9 2.25v13.5m0 0H6.25a4 4 0 0 1-4-4v-.368M9 15.75h2.75a4 4 0 0 0 4-4v-.368m-13.5 0h13.5m-13.5 0V6.618m13.5 4.764V6.618m-13.5 0h13.5"
          stroke="#8B8B8B"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return null;
}
