interface Props {
  color?: string;
  size: "24" | "18" | "20";
  [key: string]: any;
}

export function EyeIcon(props: Props) {
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
          d="M15.848 7.39c.87.915.87 2.305 0 3.22-1.467 1.543-3.986 3.64-6.848 3.64-2.862 0-5.38-2.097-6.848-3.64a2.314 2.314 0 0 1 0-3.22C3.62 5.847 6.138 3.75 9 3.75c2.862 0 5.38 2.096 6.848 3.64Z"
          stroke="#555"
          strokeWidth={1.5}
        />
        <circle cx={9} cy={9} r={2.25} stroke="#555" strokeWidth={1.5} />
      </svg>
    );
  } else if (props.size == "20") {
    return (
      <svg
        width={20}
        height={20}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M17.609 8.211a2.57 2.57 0 0 1 0 3.578c-1.63 1.715-4.43 4.044-7.609 4.044-3.18 0-5.979-2.329-7.609-4.044a2.57 2.57 0 0 1 0-3.578C4.021 6.496 6.821 4.167 10 4.167c3.18 0 5.979 2.33 7.609 4.044Z"
          stroke="#555"
          strokeWidth={1.5}
        />
        <circle cx={10} cy={10} r={2.5} stroke="#555" strokeWidth={1.5} />
      </svg>
    );
  }

  return null;
}
