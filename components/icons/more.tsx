interface Props {
  color?: string;
  size: "24" | "18";
  [key: string]: any;
}

export function MoreIcon(props: Props) {
  if (props.size == "18") {
    return (
      <svg
        width={18}
        height={18}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <g clipPath="url(#a)">
          <path
            d="M4.5 7.5C3.675 7.5 3 8.175 3 9s.675 1.5 1.5 1.5S6 9.825 6 9s-.675-1.5-1.5-1.5Zm9 0c-.825 0-1.5.675-1.5 1.5s.675 1.5 1.5 1.5S15 9.825 15 9s-.675-1.5-1.5-1.5ZM9 7.5c-.825 0-1.5.675-1.5 1.5s.675 1.5 1.5 1.5 1.5-.675 1.5-1.5S9.825 7.5 9 7.5Z"
            fill="#585858"
          />
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h18v18H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  }

  return null;
}
