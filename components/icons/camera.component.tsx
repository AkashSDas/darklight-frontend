interface Props {
  color?: string;
  size: "24" | "18" | "20";
  [key: string]: any;
}

export function CameraIcon(props: Props) {
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
          d="M5.25 4.5v.75a.75.75 0 0 0 .624-.334L5.25 4.5Zm1.055-1.582-.624-.416.624.416Zm5.39 0 .624-.416-.624.416ZM12.75 4.5l-.624.416a.75.75 0 0 0 .624.334V4.5Zm-2.25 5.625a1.5 1.5 0 0 1-1.5 1.5v1.5a3 3 0 0 0 3-3h-1.5Zm-1.5 1.5a1.5 1.5 0 0 1-1.5-1.5H6a3 3 0 0 0 3 3v-1.5Zm-1.5-1.5a1.5 1.5 0 0 1 1.5-1.5v-1.5a3 3 0 0 0-3 3h1.5Zm1.5-1.5a1.5 1.5 0 0 1 1.5 1.5H12a3 3 0 0 0-3-3v1.5ZM5.874 4.916l1.055-1.582-1.248-.832-1.055 1.582 1.248.832ZM7.553 3h2.894V1.5H7.553V3Zm3.518.334 1.055 1.582 1.248-.832-1.055-1.582-1.248.832ZM10.447 3a.75.75 0 0 1 .624.334l1.248-.832A2.25 2.25 0 0 0 10.447 1.5V3Zm-3.518.334A.75.75 0 0 1 7.553 3V1.5A2.25 2.25 0 0 0 5.68 2.502l1.248.832ZM15.75 7.5v5.25h1.5V7.5h-1.5ZM13.5 15h-9v1.5h9V15ZM2.25 12.75V7.5H.75v5.25h1.5ZM4.5 15a2.25 2.25 0 0 1-2.25-2.25H.75A3.75 3.75 0 0 0 4.5 16.5V15Zm11.25-2.25A2.25 2.25 0 0 1 13.5 15v1.5a3.75 3.75 0 0 0 3.75-3.75h-1.5Zm-2.25-7.5a2.25 2.25 0 0 1 2.25 2.25h1.5a3.75 3.75 0 0 0-3.75-3.75v1.5Zm-9-1.5A3.75 3.75 0 0 0 .75 7.5h1.5A2.25 2.25 0 0 1 4.5 5.25v-1.5Zm0 1.5h.75v-1.5H4.5v1.5Zm9-1.5h-.75v1.5h.75v-1.5Z"
          fill="#8B8B8B"
        />
        <circle cx={9} cy={4.5} fill="#8B8B8B" r={0.75} />
      </svg>
    );
  }

  return null;
}
