interface Props {
  color?: string;
  size: "24" | "18";
  [key: string]: any;
}

export function UserCircleIcon(props: Props) {
  if (props.size == "18") {
    return (
      <svg
        width={18}
        height={18}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <g
          clipPath="url(#a)"
          stroke="#555"
          strokeWidth={1.5}
          strokeLinejoin="round"
        >
          <circle cx={9} cy={9} r={7.5} />
          <path
            d="M12.75 12.75c-1.111-.956-2.39-1.5-3.75-1.5-1.36 0-2.639.544-3.75 1.5"
            strokeLinecap="round"
          />
          <circle r={2.25} transform="matrix(1 0 0 -1 9 6.75)" />
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
