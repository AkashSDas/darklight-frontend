interface Props {
  color?: string;
  size: "24" | "18";
  [key: string]: any;
}

export function DescriptionIcon(props: Props) {
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
          <circle cx={9} cy={5.25} r={0.75} fill="#8B8B8B" />
          <path
            d="M8.25 7.5H9v5.25M16.5 9a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
            stroke="#8B8B8B"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
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
