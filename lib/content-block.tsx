export type ContentBlockType =
  | "paragraph"
  | "h1"
  | "h2"
  | "h3"
  | "quote"
  | "divider"
  | "code"
  | "image";

export var contentBlocks = [
  { name: "Paragraph", description: "Plain text", icon: <Paragraph /> },
  {
    name: "Heading 1",
    description: "Big section heading",
    icon: <Heading1 />,
  },
  {
    name: "Heading 2",
    description: "Medium section heading",
    icon: <Heading2 />,
  },
  {
    name: "Heading 3",
    description: "Small section heading",
    icon: <Heading3 />,
  },
  {
    name: "Bulleted list",
    description: "Unordered list",
    icon: <UnorderedList />,
  },
  {
    name: "Numbered list",
    description: "List with number",
    icon: <OrderedList />,
  },
  {
    name: "Quote",
    description: "Capture a quote",
    icon: <Quote />,
  },
  {
    name: "Divider",
    description: "Visually divide block",
    icon: <Divider />,
  },
  {
    name: "Callout",
    description: "Make writing stand out",
    icon: <Callout />,
  },
  {
    name: "Code",
    description: "Capture a code snippet",
    icon: <Code />,
  },
  {
    name: "Image",
    description: "Add an image",
    icon: <UploadImage />,
  },
];

// BLOCK SVGS

function Paragraph(props: any) {
  return (
    <svg
      width={35}
      height={34}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.212 11.8h1.624L17.908 23h-1.424l-.832-2.288h-5.256L9.572 23H8.14l4.072-11.2Zm-1.32 7.568h4.264L13.02 13.52l-2.128 5.848ZM25.142 15h1.344v8h-1.344l-.056-1.352c-.25.464-.597.84-1.04 1.128-.437.288-.96.432-1.568.432a4.15 4.15 0 0 1-1.648-.328 4.473 4.473 0 0 1-1.36-.92 4.356 4.356 0 0 1-.912-1.36 4.171 4.171 0 0 1-.328-1.656c0-.57.107-1.11.32-1.616.213-.507.51-.95.888-1.328a4.17 4.17 0 0 1 1.328-.896 3.997 3.997 0 0 1 1.616-.328c.63 0 1.181.15 1.656.448.475.293.859.675 1.152 1.144L25.142 15Zm-2.688 6.904c.528 0 .984-.128 1.368-.384.39-.261.688-.613.896-1.056.213-.443.32-.93.32-1.464 0-.544-.107-1.035-.32-1.472a2.55 2.55 0 0 0-.904-1.048c-.384-.261-.837-.392-1.36-.392-.528 0-1.008.13-1.44.392A2.89 2.89 0 0 0 19.606 19c0 .539.13 1.03.392 1.472a3.01 3.01 0 0 0 1.04 1.048c.432.256.904.384 1.416.384Z"
        fill="#131313"
      />
      <rect
        x={0.375}
        y={0.875}
        width={34.25}
        height={32.25}
        rx={2.625}
        stroke="#F0F0F0"
        strokeWidth={0.75}
      />
    </svg>
  );
}

function Heading1(props: any) {
  return (
    <svg
      width={35}
      height={33}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x={0.25}
        y={0.25}
        width={34.5}
        height={32.5}
        rx={2.75}
        fill="#FCFCFC"
      />
      <path
        d="M13.848 6.8h1.344V18h-1.344v-5.328H8.304V18H6.96V6.8h1.344v4.528h5.544V6.8ZM18.052 18V8.144h-1.256l.376-1.344h2.224V18h-1.344Z"
        fill="#131313"
      />
      <rect x={6} y={22} width={23} height={1} rx={0.5} fill="#8B8B8B" />
      <rect x={6} y={25} width={18} height={1} rx={0.5} fill="#8B8B8B" />
      <rect x={6} y={28} width={10} height={1} rx={0.5} fill="#8B8B8B" />
      <rect
        x={0.25}
        y={0.25}
        width={34.5}
        height={32.5}
        rx={2.75}
        stroke="#F0F0F0"
        strokeWidth={0.5}
      />
    </svg>
  );
}

function Heading2(props: any) {
  return (
    <svg
      width={35}
      height={34}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x={0.25}
        y={0.75}
        width={34.5}
        height={32.5}
        rx={2.75}
        fill="#FCFCFC"
      />
      <path
        d="M13.848 7.3h1.344v11.2h-1.344v-5.328H8.304V18.5H6.96V7.3h1.344v4.528h5.544V7.3Zm2.948 11.2v-1.192c.41-.368.872-.779 1.384-1.232a47.402 47.402 0 0 0 1.528-1.432c.512-.501.982-.997 1.408-1.488.427-.49.77-.955 1.032-1.392.262-.443.392-.83.392-1.16 0-.395-.096-.755-.288-1.08a2.209 2.209 0 0 0-.776-.792 2.002 2.002 0 0 0-1.072-.296c-.394 0-.757.099-1.088.296a2.274 2.274 0 0 0-.784.792 2.085 2.085 0 0 0-.288 1.08H16.9c0-.656.16-1.248.48-1.776.32-.533.744-.955 1.272-1.264a3.358 3.358 0 0 1 1.752-.472c.64 0 1.222.157 1.744.472.528.315.95.739 1.264 1.272.315.528.472 1.117.472 1.768 0 .373-.09.776-.272 1.208-.181.427-.43.867-.744 1.32-.314.453-.672.912-1.072 1.376-.4.459-.821.912-1.264 1.36-.442.448-.882.877-1.32 1.288h4.816V18.5h-7.232Z"
        fill="#131313"
      />
      <rect x={6} y={22.5} width={23} height={1} rx={0.5} fill="#8B8B8B" />
      <rect x={6} y={25.5} width={18} height={1} rx={0.5} fill="#8B8B8B" />
      <rect x={6} y={28.5} width={10} height={1} rx={0.5} fill="#8B8B8B" />
      <rect
        x={0.25}
        y={0.75}
        width={34.5}
        height={32.5}
        rx={2.75}
        stroke="#F0F0F0"
        strokeWidth={0.5}
      />
    </svg>
  );
}

function Heading3(props: any) {
  return (
    <svg
      width={35}
      height={34}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x={0.25}
        y={0.75}
        width={34.5}
        height={32.5}
        rx={2.75}
        fill="#FCFCFC"
      />
      <path
        d="M13.848 7.3h1.344v11.2h-1.344v-5.328H8.304V18.5H6.96V7.3h1.344v4.528h5.544V7.3Zm6.276 11.408c-.677 0-1.28-.152-1.808-.456a3.41 3.41 0 0 1-1.232-1.232 3.378 3.378 0 0 1-.448-1.72h1.344c0 .379.088.725.264 1.04.176.31.424.557.744.744.32.187.699.28 1.136.28.379 0 .73-.093 1.056-.28.33-.187.598-.435.8-.744.203-.315.304-.661.304-1.04 0-.475-.122-.87-.368-1.184-.24-.32-.576-.557-1.008-.712-.426-.16-.914-.24-1.464-.24v-1.08c.758 0 1.363-.157 1.816-.472.459-.315.688-.779.688-1.392 0-.325-.088-.624-.264-.896a1.934 1.934 0 0 0-.696-.648 1.776 1.776 0 0 0-.912-.248c-.33 0-.648.083-.952.248-.304.16-.552.376-.744.648a1.52 1.52 0 0 0-.288.896h-1.344c0-.432.088-.837.264-1.216.182-.379.427-.712.736-1 .315-.288.67-.512 1.064-.672.395-.165.81-.248 1.248-.248.57 0 1.102.141 1.592.424.49.283.886.661 1.184 1.136.304.475.456 1 .456 1.576 0 .517-.13.995-.392 1.432a2.122 2.122 0 0 1-1.064.92c.39.133.718.341.984.624.267.277.467.597.6.96.139.363.208.744.208 1.144 0 .624-.162 1.195-.488 1.712a3.61 3.61 0 0 1-1.28 1.24 3.418 3.418 0 0 1-1.736.456Z"
        fill="#131313"
      />
      <rect x={6} y={22.5} width={23} height={1} rx={0.5} fill="#8B8B8B" />
      <rect x={6} y={25.5} width={18} height={1} rx={0.5} fill="#8B8B8B" />
      <rect x={6} y={28.5} width={10} height={1} rx={0.5} fill="#8B8B8B" />
      <rect
        x={0.25}
        y={0.75}
        width={34.5}
        height={32.5}
        rx={2.75}
        stroke="#F0F0F0"
        strokeWidth={0.5}
      />
    </svg>
  );
}

function UnorderedList(props: any) {
  return (
    <svg
      width={35}
      height={34}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x={0.25}
        y={0.75}
        width={34.5}
        height={32.5}
        rx={2.75}
        fill="#FCFCFC"
      />
      <circle cx={10} cy={17} r={4} fill="#131313" />
      <rect x={16} y={13.5} width={15} height={1} rx={0.5} fill="#8B8B8B" />
      <rect x={16} y={16.5} width={10} height={1} rx={0.5} fill="#8B8B8B" />
      <rect x={16} y={19.5} width={6} height={1} rx={0.5} fill="#8B8B8B" />
      <rect
        x={0.25}
        y={0.75}
        width={34.5}
        height={32.5}
        rx={2.75}
        stroke="#F0F0F0"
        strokeWidth={0.5}
      />
    </svg>
  );
}

function OrderedList(props: any) {
  return (
    <svg
      width={35}
      height={34}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x={0.25}
        y={0.75}
        width={34.5}
        height={32.5}
        rx={2.75}
        fill="#FCFCFC"
      />
      <path
        d="M7.422 21v-7.392H6.48l.282-1.008H8.43V21H7.422Zm2.99.156a.532.532 0 0 1-.39-.162.55.55 0 0 1-.155-.396c0-.148.052-.276.156-.384a.532.532 0 0 1 .39-.162c.156 0 .288.054.396.162a.525.525 0 0 1 .162.384.539.539 0 0 1-.162.396.539.539 0 0 1-.396.162Z"
        fill="#131313"
      />
      <rect x={14} y={13.5} width={15} height={1} rx={0.5} fill="#8B8B8B" />
      <rect x={14} y={16.5} width={10} height={1} rx={0.5} fill="#8B8B8B" />
      <rect x={14} y={19.5} width={6} height={1} rx={0.5} fill="#8B8B8B" />
      <rect
        x={0.25}
        y={0.75}
        width={34.5}
        height={32.5}
        rx={2.75}
        stroke="#F0F0F0"
        strokeWidth={0.5}
      />
    </svg>
  );
}

function Quote(props: any) {
  return (
    <svg
      width={35}
      height={34}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x={0.25}
        y={0.75}
        width={34.5}
        height={32.5}
        rx={2.75}
        fill="#FCFCFC"
      />
      <rect
        x={6}
        y={27}
        width={20}
        height={1}
        rx={0.5}
        transform="rotate(-90 6 27)"
        fill="#131313"
      />
      <path
        d="M12.537 8.8v.504h-1.398V13h-.504V9.304H9.24V8.8h3.297Zm1.46 4.278c-.277 0-.529-.071-.757-.213a1.597 1.597 0 0 1-.543-.57 1.603 1.603 0 0 1-.2-.795 1.607 1.607 0 0 1 .438-1.119c.137-.146.297-.26.48-.342a1.4 1.4 0 0 1 .581-.123c.276 0 .527.071.753.213.228.142.41.333.543.573.136.24.204.506.204.798a1.596 1.596 0 0 1-.918 1.455c-.18.082-.374.123-.582.123Zm0-.504a.907.907 0 0 0 .506-.147 1.112 1.112 0 0 0 .489-.927c0-.196-.045-.376-.135-.54a1.058 1.058 0 0 0-.357-.393.901.901 0 0 0-.504-.147.893.893 0 0 0-.507.15c-.15.098-.269.229-.357.393A1.118 1.118 0 0 0 13 11.5c0 .2.045.382.135.546.09.162.211.291.363.387a.929.929 0 0 0 .498.141Zm4.996-2.658c.292 0 .557.071.795.213.24.142.431.333.573.573.142.238.213.503.213.795a1.55 1.55 0 0 1-.465 1.119 1.587 1.587 0 0 1-1.116.462c-.232 0-.434-.054-.606-.162a1.25 1.25 0 0 1-.408-.429V13h-.504V8.5h.504v2.007c.102-.176.238-.318.408-.426a1.1 1.1 0 0 1 .606-.165Zm-.006 2.67c.198 0 .378-.049.54-.147a1.077 1.077 0 0 0 .531-.942 1.096 1.096 0 0 0-.537-.945 1.012 1.012 0 0 0-.534-.147.899.899 0 0 0-.513.147.986.986 0 0 0-.336.396 1.275 1.275 0 0 0-.117.549c0 .202.04.386.117.552a.907.907 0 0 0 .849.537Zm3.388.492c-.276 0-.528-.071-.756-.213a1.597 1.597 0 0 1-.543-.57 1.603 1.603 0 0 1-.2-.795 1.607 1.607 0 0 1 .438-1.119c.137-.146.297-.26.48-.342a1.4 1.4 0 0 1 .581-.123c.226 0 .433.046.621.138.19.09.352.216.486.378a1.6 1.6 0 0 1 .303.564c.068.214.093.443.075.687h-2.448c.024.17.08.322.168.456a.94.94 0 0 0 1.284.297c.146-.094.264-.222.354-.384l.513.12c-.12.266-.3.484-.543.654a1.393 1.393 0 0 1-.813.252Zm-.978-1.791h1.956a.983.983 0 0 0-.162-.459 1.063 1.063 0 0 0-.35-.336.897.897 0 0 0-.466-.126.898.898 0 0 0-.462.123c-.14.082-.256.193-.348.333-.09.138-.146.293-.168.465ZM10.68 19.078c-.276 0-.528-.071-.756-.213a1.597 1.597 0 0 1-.543-.57 1.603 1.603 0 0 1-.201-.795 1.607 1.607 0 0 1 .438-1.119c.138-.146.298-.26.48-.342a1.4 1.4 0 0 1 .582-.123c.276 0 .527.071.753.213.228.142.409.333.543.573.136.24.204.506.204.798a1.596 1.596 0 0 1-.918 1.455c-.18.082-.374.123-.582.123Zm0-.504a.907.907 0 0 0 .507-.147 1.112 1.112 0 0 0 .489-.927c0-.196-.045-.376-.135-.54a1.058 1.058 0 0 0-.357-.393.901.901 0 0 0-.504-.147.893.893 0 0 0-.507.15c-.15.098-.269.229-.357.393a1.118 1.118 0 0 0-.132.537c0 .2.045.382.135.546.09.162.211.291.363.387a.929.929 0 0 0 .498.141Zm1.996.426v-3h.504v.375c.106-.14.24-.251.402-.333a1.13 1.13 0 0 1 .528-.126c.116 0 .228.015.336.045l-.204.504a.792.792 0 0 0-.654.072.82.82 0 0 0-.297.294.792.792 0 0 0-.11.414V19h-.505Zm6.285-1.866V19h-.504v-1.755a.792.792 0 0 0-.11-.414.82.82 0 0 0-.712-.405.82.82 0 0 0-.711.405.792.792 0 0 0-.11.414V19h-.505v-3h.504v.375c.106-.14.24-.251.402-.333a1.13 1.13 0 0 1 .528-.126c.224 0 .428.055.612.165a1.203 1.203 0 0 1 .606 1.053Zm1.862 1.944c-.276 0-.528-.071-.756-.213a1.597 1.597 0 0 1-.543-.57 1.603 1.603 0 0 1-.201-.795 1.607 1.607 0 0 1 .438-1.119c.138-.146.298-.26.48-.342a1.4 1.4 0 0 1 .582-.123c.276 0 .527.071.753.213.228.142.409.333.543.573.136.24.204.506.204.798a1.596 1.596 0 0 1-.918 1.455c-.18.082-.374.123-.582.123Zm0-.504a.907.907 0 0 0 .507-.147 1.112 1.112 0 0 0 .489-.927c0-.196-.045-.376-.135-.54a1.058 1.058 0 0 0-.357-.393.901.901 0 0 0-.504-.147.893.893 0 0 0-.507.15c-.15.098-.27.229-.357.393a1.118 1.118 0 0 0-.132.537c0 .2.045.382.135.546.09.162.21.291.363.387a.929.929 0 0 0 .498.141Zm3.515-2.07h-.681L23.654 19h-.504l.003-2.496h-.516V16h.516l-.003-.942h.504l.003.942h.68v.504Zm-13.424 6h-.681L10.23 25h-.504l.003-2.496h-.516V22h.516l-.003-.942h.504l.003.942h.681v.504Zm1.782 2.574c-.276 0-.528-.071-.756-.213a1.597 1.597 0 0 1-.543-.57 1.603 1.603 0 0 1-.201-.795 1.607 1.607 0 0 1 .438-1.119c.138-.146.298-.26.48-.342a1.4 1.4 0 0 1 .582-.123c.276 0 .527.071.753.213.228.142.409.333.543.573.136.24.204.506.204.798a1.596 1.596 0 0 1-.918 1.455c-.18.082-.374.123-.582.123Zm0-.504a.907.907 0 0 0 .507-.147 1.112 1.112 0 0 0 .489-.927c0-.196-.045-.376-.135-.54a1.058 1.058 0 0 0-.357-.393.901.901 0 0 0-.504-.147.893.893 0 0 0-.507.15c-.15.098-.27.229-.357.393a1.118 1.118 0 0 0-.132.537c0 .2.045.382.135.546.09.162.21.291.363.387a.929.929 0 0 0 .498.141Zm4.996-2.658c.293 0 .558.071.796.213.24.142.43.333.573.573.142.238.212.503.212.795a1.55 1.55 0 0 1-.465 1.119 1.587 1.587 0 0 1-1.116.462c-.232 0-.433-.054-.605-.162a1.25 1.25 0 0 1-.409-.429V25h-.504v-4.5h.505v2.007c.102-.176.238-.318.408-.426a1.1 1.1 0 0 1 .605-.165Zm-.006 2.67c.198 0 .378-.049.54-.147a1.077 1.077 0 0 0 .531-.942 1.096 1.096 0 0 0-.537-.945 1.012 1.012 0 0 0-.534-.147.899.899 0 0 0-.512.147.986.986 0 0 0-.337.396 1.275 1.275 0 0 0-.116.549c0 .202.038.386.116.552a.907.907 0 0 0 .849.537Zm3.389.492c-.276 0-.528-.071-.756-.213a1.597 1.597 0 0 1-.543-.57 1.603 1.603 0 0 1-.201-.795 1.607 1.607 0 0 1 .438-1.119c.137-.146.297-.26.48-.342a1.4 1.4 0 0 1 .582-.123c.226 0 .433.046.62.138.19.09.352.216.486.378a1.6 1.6 0 0 1 .303.564c.068.214.093.443.075.687h-2.448c.024.17.08.322.168.456.088.132.2.237.337.315a.94.94 0 0 0 .948-.018c.145-.094.264-.222.354-.384l.512.12c-.12.266-.3.484-.543.654a1.393 1.393 0 0 1-.813.252Zm-.979-1.791h1.956a.983.983 0 0 0-.162-.459 1.063 1.063 0 0 0-.35-.336.897.897 0 0 0-.465-.126.898.898 0 0 0-.462.123c-.14.082-.256.193-.348.333-.09.138-.146.293-.169.465Z"
        fill="#DCDEE3"
      />
      <rect
        x={0.25}
        y={0.75}
        width={34.5}
        height={32.5}
        rx={2.75}
        stroke="#F0F0F0"
        strokeWidth={0.5}
      />
    </svg>
  );
}

function Divider(props: any) {
  return (
    <svg
      width={35}
      height={34}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x={0.25}
        y={0.75}
        width={34.5}
        height={32.5}
        rx={2.75}
        fill="#FCFCFC"
      />
      <rect x={6} y={5.5} width={23} height={1} rx={0.5} fill="#DCDEE3" />
      <rect x={6} y={8.5} width={23} height={1} rx={0.5} fill="#DCDEE3" />
      <rect x={6} y={11.5} width={13} height={1} rx={0.5} fill="#DCDEE3" />
      <rect x={6} y={16.5} width={23} height={1} rx={0.5} fill="#131313" />
      <rect x={6} y={21.5} width={23} height={1} rx={0.5} fill="#DCDEE3" />
      <rect x={6} y={24.5} width={23} height={1} rx={0.5} fill="#DCDEE3" />
      <rect x={6} y={27.5} width={13} height={1} rx={0.5} fill="#DCDEE3" />
      <rect
        x={0.25}
        y={0.75}
        width={34.5}
        height={32.5}
        rx={2.75}
        stroke="#F0F0F0"
        strokeWidth={0.5}
      />
    </svg>
  );
}

function Callout(props: any) {
  return (
    <svg
      width={35}
      height={34}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x={0.25}
        y={0.75}
        width={34.5}
        height={32.5}
        rx={2.75}
        fill="#FCFCFC"
      />
      <rect x={6} y={7} width={23} height={1} rx={0.5} fill="#DCDEE3" />
      <rect x={6} y={10} width={23} height={1} rx={0.5} fill="#DCDEE3" />
      <rect x={6} y={13} width={23} height={1} rx={0.5} fill="#DCDEE3" />
      <path
        stroke="#131313"
        strokeWidth={0.75}
        d="M6.375 16.375h22.25v4.25H6.375z"
      />
      <rect x={6} y={23} width={23} height={1} rx={0.5} fill="#DCDEE3" />
      <rect x={6} y={26} width={23} height={1} rx={0.5} fill="#DCDEE3" />
      <rect
        x={0.25}
        y={0.75}
        width={34.5}
        height={32.5}
        rx={2.75}
        stroke="#F0F0F0"
        strokeWidth={0.5}
      />
    </svg>
  );
}

function Code(props: any) {
  return (
    <svg
      width={35}
      height={34}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x={0.25}
        y={0.75}
        width={34.5}
        height={32.5}
        rx={2.75}
        fill="#FCFCFC"
      />
      <path
        d="M6.755 11V8.935h-.602V8.61c.251 0 .42-.036.504-.106.085-.071.127-.2.127-.386h.352V11h-.381Z"
        fill="#8B8B8B"
      />
      <path
        d="m11.352 11.276-.297-.132 1.454-3.37.297.13-1.454 3.372Zm1.375 0-.297-.132 1.454-3.37.297.13-1.454 3.372ZM15.65 11V8.032h.373l1.017 2.421 1.018-2.421h.373V11h-.373V8.833L17.188 11h-.296l-.87-2.18V11h-.372Zm4.84-1.955h.368v1.993c0 .308-.089.543-.267.704-.158.141-.372.212-.64.212-.283 0-.503-.068-.662-.204a.636.636 0 0 1-.22-.504h.373c.014.266.182.399.504.399.362 0 .543-.211.543-.632v-.365c-.13.269-.356.403-.678.403-.246 0-.431-.075-.556-.225-.124-.152-.186-.357-.186-.615V9.045h.369v1.09c0 .19.036.335.11.437.076.099.205.148.386.148a.485.485 0 0 0 .411-.19.784.784 0 0 0 .144-.48V9.045Zm2.265-.339c0-.116.014-.217.042-.305a.575.575 0 0 1 .114-.204.49.49 0 0 1 .157-.118.568.568 0 0 1 .31-.072c.127 0 .226.014.297.042v.318a.774.774 0 0 0-.2-.03.547.547 0 0 0-.123.013.338.338 0 0 0-.11.042.237.237 0 0 0-.089.11.544.544 0 0 0-.03.196v.347h.552v.31h-.552V11h-.368V9.355h-.416v-.31h.416v-.339Zm1.488-.593a.28.28 0 0 1 .212.089.288.288 0 0 1 .085.212.288.288 0 0 1-.297.296.293.293 0 0 1-.216-.084.288.288 0 0 1-.085-.212c0-.085.028-.156.085-.212a.286.286 0 0 1 .216-.09ZM24.056 11V9.045h.37V11h-.37Z"
        fill="#7D8082"
      />
      <path
        d="M6.225 16c0-.32.055-.578.165-.776.11-.198.294-.365.551-.5l.441-.23c.266-.138.399-.338.399-.601a.455.455 0 0 0-.14-.348.502.502 0 0 0-.365-.136.558.558 0 0 0-.436.174c-.102.116-.153.28-.153.492h-.399c0-.305.09-.548.267-.73.181-.183.422-.275.721-.275.28 0 .502.072.666.216.164.145.246.341.246.59 0 .376-.187.665-.56.869l-.44.233c-.179.096-.303.192-.374.289a.788.788 0 0 0-.136.385h1.514V16H6.225Z"
        fill="#8B8B8B"
      />
      <path
        d="M12.132 16.05c-.297 0-.533-.092-.708-.279-.175-.19-.263-.438-.263-.746s.088-.556.263-.742c.175-.19.411-.284.708-.284.263 0 .475.066.636.199.161.13.253.305.276.526h-.37c-.05-.263-.231-.395-.542-.395a.557.557 0 0 0-.445.187c-.107.121-.161.291-.161.509 0 .217.053.389.16.513a.563.563 0 0 0 .446.182c.308 0 .49-.127.543-.381h.369a.74.74 0 0 1-.276.521c-.161.127-.373.19-.636.19Zm2.274 0c-.31 0-.558-.097-.742-.292a1.042 1.042 0 0 1-.275-.737c0-.294.092-.539.275-.734.184-.195.431-.293.742-.293.308 0 .554.1.738.297.187.195.28.438.28.73 0 .293-.093.54-.28.737-.184.195-.43.293-.738.293Zm-.479-.525c.119.13.279.195.48.195.2 0 .358-.065.474-.195a.74.74 0 0 0 .174-.504c0-.201-.058-.367-.174-.497a.597.597 0 0 0-.475-.199.61.61 0 0 0-.479.2.724.724 0 0 0-.174.5c0 .2.058.367.174.5Zm1.975.475v-1.955h.369v.36a.646.646 0 0 1 .254-.3.797.797 0 0 1 .428-.11c.486 0 .73.267.73.8V16h-.37v-1.043c0-.22-.039-.383-.118-.488-.076-.104-.2-.156-.373-.156a.504.504 0 0 0-.412.173c-.093.116-.14.276-.14.48V16h-.368Zm3.054.05c-.246 0-.444-.06-.593-.181a.574.574 0 0 1-.22-.454h.364c0 .099.042.18.127.246a.56.56 0 0 0 .34.093c.11 0 .197-.025.262-.076a.25.25 0 0 0 .098-.208c0-.139-.064-.223-.191-.254l-.522-.136c-.28-.076-.42-.252-.42-.526 0-.161.068-.294.204-.398.136-.108.312-.162.53-.162.238 0 .421.056.551.166.133.107.2.249.2.424h-.365a.262.262 0 0 0-.106-.22.463.463 0 0 0-.297-.085.43.43 0 0 0-.254.072.215.215 0 0 0-.098.186c0 .133.072.216.216.25l.488.136a.601.601 0 0 1 .322.195c.077.093.115.2.115.318a.561.561 0 0 1-.2.45c-.132.11-.316.165-.55.165Zm2.004-.36c.102 0 .184-.007.246-.02v.326c-.085.02-.194.03-.327.03a1.29 1.29 0 0 1-.156-.009.605.605 0 0 1-.153-.047.407.407 0 0 1-.148-.106.62.62 0 0 1-.102-.199 1.026 1.026 0 0 1-.043-.314v-.996h-.352v-.31h.352v-.619h.37v.62h.491v.309h-.492v.916c0 .172.026.285.077.339.05.054.13.08.237.08Z"
        fill="#EA4335"
      />
      <path
        d="M23.535 16.05c-.302 0-.54-.095-.712-.287-.17-.193-.255-.439-.255-.738 0-.297.088-.543.263-.738.178-.195.416-.293.713-.293.152 0 .29.036.411.107.122.07.213.166.276.288v-.344h.364V16h-.364v-.343a.714.714 0 0 1-.285.288.834.834 0 0 1-.41.106Zm.051-.33c.207 0 .368-.066.484-.2a.727.727 0 0 0 .178-.495.717.717 0 0 0-.178-.496.601.601 0 0 0-.484-.204.605.605 0 0 0-.475.2.713.713 0 0 0-.178.5c0 .203.06.37.178.5.119.13.277.195.475.195Z"
        fill="#131313"
      />
      <path
        d="M7.196 21.047c-.323 0-.576-.084-.76-.25-.18-.17-.27-.405-.27-.704h.394c0 .198.055.352.165.462.113.107.27.16.47.16a.612.612 0 0 0 .425-.143.477.477 0 0 0 .165-.378c0-.17-.052-.3-.157-.39-.104-.093-.256-.14-.454-.14h-.212v-.335h.217c.175 0 .308-.04.398-.123.094-.081.14-.2.14-.356a.415.415 0 0 0-.148-.33.556.556 0 0 0-.382-.128.586.586 0 0 0-.42.149.509.509 0 0 0-.156.394h-.378c0-.263.086-.472.259-.627.172-.159.404-.238.695-.238.277 0 .5.072.67.216.17.142.255.33.255.564 0 .334-.176.547-.526.64a.647.647 0 0 1 .424.23.71.71 0 0 1 .165.474.774.774 0 0 1-.275.615c-.181.159-.416.238-.704.238Z"
        fill="#8B8B8B"
      />
      <path
        d="m11.873 21-.86-1.955h.394l.615 1.463.619-1.463h.394L12.175 21h-.302Zm2.263.05c-.302 0-.54-.095-.712-.287-.17-.193-.255-.439-.255-.738 0-.297.088-.543.263-.738.178-.195.416-.293.713-.293.152 0 .29.036.41.107.122.07.214.166.276.288v-.344h.365V21h-.365v-.343a.714.714 0 0 1-.284.288.834.834 0 0 1-.411.106Zm.05-.33c.207 0 .368-.066.484-.2a.727.727 0 0 0 .178-.495.717.717 0 0 0-.178-.496.601.601 0 0 0-.483-.204.606.606 0 0 0-.475.2.713.713 0 0 0-.178.5c0 .203.06.37.178.5.119.13.277.195.475.195Zm1.645.28v-1.955h.37v.446a.585.585 0 0 1 .572-.475c.076 0 .135.005.178.017v.339a.998.998 0 0 0-.183-.013.48.48 0 0 0-.424.22 1.012 1.012 0 0 0-.144.564V21h-.369Z"
        fill="#EA4335"
      />
      <path
        d="M19.521 18.994c.28 0 .508.097.683.289.175.19.263.436.263.742 0 .3-.09.545-.272.738a.913.913 0 0 1-.695.288.842.842 0 0 1-.416-.106.688.688 0 0 1-.28-.288V21h-.368v-2.968h.369v1.357a.681.681 0 0 1 .284-.288.89.89 0 0 1 .432-.107Zm-.072 1.726a.61.61 0 0 0 .466-.195.704.704 0 0 0 .183-.5c0-.204-.061-.37-.182-.5a.604.604 0 0 0-.467-.2.634.634 0 0 0-.479.195.71.71 0 0 0-.182.505c0 .203.06.37.182.5.124.13.284.195.48.195Zm2.471-1.26v-.33h1.798v.33H21.92Zm0 .751v-.33h1.798v.33H21.92Z"
        fill="#131313"
      />
      <path
        d="M8.268 24.72v.347H7.82V26h-.382v-.933H6.276v-1.95h.385v1.602h.776v-.852h.382v.852h.45Z"
        fill="#8B8B8B"
      />
      <path
        d="M12.403 23.994c.28 0 .508.097.683.289.175.19.263.436.263.742 0 .3-.09.545-.271.738a.913.913 0 0 1-.696.288.842.842 0 0 1-.415-.106.687.687 0 0 1-.28-.288V26h-.369v-2.968h.369v1.357a.681.681 0 0 1 .284-.288.89.89 0 0 1 .432-.107Zm-.072 1.726a.61.61 0 0 0 .467-.195.704.704 0 0 0 .182-.5c0-.204-.06-.37-.182-.5a.604.604 0 0 0-.467-.2.634.634 0 0 0-.479.195.71.71 0 0 0-.182.505c0 .203.06.37.182.5.125.13.284.195.48.195Zm3.141-.212v-.678h-.67v-.327h.67v-.687h.352v.687h.67v.327h-.67v.678h-.352Zm1.467-1.047v-.33h1.797v.33H16.94Zm0 .75v-.33h1.797v.33H16.94Z"
        fill="#131313"
      />
      <path
        d="M20.667 23.889a.334.334 0 0 1-.25-.12c-.074-.078-.11-.191-.11-.338a.6.6 0 0 1 .135-.408.472.472 0 0 1 .377-.156c.054 0 .098.004.132.012v.17a.775.775 0 0 0-.132-.008c-.113 0-.19.046-.233.14-.04.059-.06.13-.06.211.035-.042.088-.063.162-.063.076 0 .14.025.19.076.054.051.081.117.081.2 0 .081-.027.15-.08.203a.287.287 0 0 1-.212.08Zm.78 0a.334.334 0 0 1-.25-.12c-.074-.078-.11-.191-.11-.338a.6.6 0 0 1 .135-.408.473.473 0 0 1 .377-.156c.054 0 .098.004.132.012v.17a.774.774 0 0 0-.132-.008c-.113 0-.19.046-.233.14-.04.059-.06.13-.06.211.035-.042.089-.063.162-.063.076 0 .14.025.19.076.055.051.081.117.081.2 0 .081-.026.15-.08.203a.287.287 0 0 1-.212.08Zm1.373 2.162c-.31 0-.558-.098-.742-.293a1.043 1.043 0 0 1-.276-.737c0-.294.092-.539.276-.734.184-.195.431-.293.742-.293.308 0 .554.1.738.297.186.195.28.438.28.73 0 .293-.094.54-.28.737-.184.195-.43.293-.738.293Zm-.479-.526c.119.13.278.195.48.195.2 0 .358-.065.474-.195a.74.74 0 0 0 .174-.504c0-.201-.058-.367-.174-.497a.597.597 0 0 0-.475-.199.61.61 0 0 0-.479.2.724.724 0 0 0-.174.5c0 .2.058.367.174.5Zm1.974.475v-1.955h.37v.446a.585.585 0 0 1 .572-.475c.076 0 .135.005.178.017v.339a.998.998 0 0 0-.182-.013.48.48 0 0 0-.425.22 1.012 1.012 0 0 0-.144.564V26h-.369Z"
        fill="#34A853"
      />
      <rect
        x={0.25}
        y={0.75}
        width={34.5}
        height={32.5}
        rx={2.75}
        stroke="#F0F0F0"
        strokeWidth={0.5}
      />
    </svg>
  );
}

function UploadImage(props: any) {
  return (
    <svg
      width={35}
      height={34}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <rect
        x={0.25}
        y={0.75}
        width={34.5}
        height={32.5}
        rx={2.75}
        fill="#FCFCFC"
      />
      <rect
        x={0.25}
        y={0.75}
        width={34.5}
        height={32.5}
        rx={2.75}
        fill="url(#a)"
      />
      <rect
        x={0.25}
        y={0.75}
        width={34.5}
        height={32.5}
        rx={2.75}
        stroke="#F0F0F0"
        strokeWidth={0.5}
      />
      <defs>
        <pattern
          id="a"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <use xlinkHref="#b" transform="matrix(.0027 0 0 .00287 0 -.187)" />
        </pattern>
        <image
          id="b"
          width={370}
          height={479}
          xlinkHref="data:image/jpeg;base64,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"
        />
      </defs>
    </svg>
  );
}
