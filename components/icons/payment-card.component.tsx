interface Props {
  color?: string;
  size: "24" | "18";
  [key: string]: any;
}

export function PaymentCardIcon(props: Props) {
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
          d="M7.5 9.75a.75.75 0 0 0 0 1.5v-1.5Zm3 1.5a.75.75 0 0 0 0-1.5v1.5ZM3 9h12V7.5H3V9Zm12.75.75v3h1.5v-3h-1.5ZM13.5 15h-9v1.5h9V15ZM2.25 12.75v-3H.75v3h1.5ZM4.5 15a2.25 2.25 0 0 1-2.25-2.25H.75A3.75 3.75 0 0 0 4.5 16.5V15Zm11.25-2.25A2.25 2.25 0 0 1 13.5 15v1.5a3.75 3.75 0 0 0 3.75-3.75h-1.5ZM15 9a.75.75 0 0 1 .75.75h1.5A2.25 2.25 0 0 0 15 7.5V9ZM3 7.5A2.25 2.25 0 0 0 .75 9.75h1.5A.75.75 0 0 1 3 9V7.5ZM4.5 6h9V4.5h-9V6Zm9.75.75v1.5h1.5v-1.5h-1.5Zm-10.5 1.5v-1.5h-1.5v1.5h1.5ZM13.5 6a.75.75 0 0 1 .75.75h1.5A2.25 2.25 0 0 0 13.5 4.5V6Zm-9-1.5a2.25 2.25 0 0 0-2.25 2.25h1.5A.75.75 0 0 1 4.5 6V4.5ZM6 3h6V1.5H6V3Zm6.75.75v1.5h1.5v-1.5h-1.5Zm-7.5 1.5v-1.5h-1.5v1.5h1.5ZM12 3a.75.75 0 0 1 .75.75h1.5A2.25 2.25 0 0 0 12 1.5V3ZM6 1.5a2.25 2.25 0 0 0-2.25 2.25h1.5A.75.75 0 0 1 6 3V1.5Zm1.5 9.75h3v-1.5h-3v1.5Z"
          fill="#555"
        />
      </svg>
    );
  }

  return null;
}
