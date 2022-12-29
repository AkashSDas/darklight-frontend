import Image from "next/image";

import { getBlockDataValue } from "@lib/content-block";

export default function ContentBlock(props: any): JSX.Element | null {
  var { block } = props;

  if (block.type == "paragraph") {
    return <ParagraphBlock block={block} />;
  } else if (block.type == "image") {
    return <ImageBlock block={block} />;
  }

  return null;
}

function ParagraphBlock(props: any): JSX.Element {
  var { block } = props;

  return (
    <div className="w-full">
      <p className="leading-[100%]">{getBlockDataValue(block, "text")}</p>
    </div>
  );
}

function ImageBlock(props: any): JSX.Element {
  var { block } = props;

  return (
    <div className="w-full relative h-[500px]">
      <Image
        src={getBlockDataValue(block, "URL")}
        alt="Image content block"
        fill
        className="object-cover"
      />
    </div>
  );
}
