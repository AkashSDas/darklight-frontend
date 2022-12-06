interface Props {
  color?: string;
  size: "24" | "18" | "20";
  [key: string]: any;
}

export function SearchIcon(props: Props) {
  if (props.size == "20") {
    return (
      <svg
        width={20}
        height={20}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <g clipPath="url(#a)">
          <path
            d="m18.333 18.333-1.666-1.666m-15-7.084a7.917 7.917 0 1 1 15.833 0 7.917 7.917 0 0 1-15.833 0Z"
            stroke="#555"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h20v20H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  }

  return null;
}
