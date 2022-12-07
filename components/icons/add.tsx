interface Props {
  color?: string;
  size: "24" | "18";
  [key: string]: any;
}

export function AddIcon(props: Props) {
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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.563 4.5a.563.563 0 0 0-1.126 0v3.938H4.5a.563.563 0 0 0 0 1.124h3.938V13.5a.562.562 0 1 0 1.124 0V9.562H13.5a.562.562 0 1 0 0-1.124H9.562V4.5Z"
          fill="#585858"
        />
      </svg>
    );
  }

  return null;
}
