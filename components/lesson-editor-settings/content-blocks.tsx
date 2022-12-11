import { useEditableLesson } from "@lib/hooks.lib";

import ImageBlock from "./image-block";
import ParagraphBlock from "./paragraph-block";

export default function ContentBlocks() {
  var { lesson } = useEditableLesson();

  //   return <div>{JSON.stringify(lesson.content)}</div>;

  return (
    <div className="flex flex-col gap-3 mb-6">
      {lesson?.content.map((block: any) => {
        if (block.type == "paragraph") {
          return <ParagraphBlock key={block.id} id={block.id} />;
        }
        if (block.type == "image") {
          return <ImageBlock key={block.id} id={block.id} />;
        }
        return null;
      })}
    </div>
  );
}
