import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { reorderContent } from "services/lesson-content.service";

import { DragIcon } from "@components/shared/icons";
import { useEditableLesson, useUser } from "@lib/hooks.lib";

import ParagraphBlock from "./paragraph-block";

export default function EditContentBlocks(): JSX.Element {
  var { accessToken } = useUser();
  var { lesson, mutateLesson, courseId, groupId } = useEditableLesson();

  async function onDragEnd(dropEvent: DropResult) {
    // Reorder
    var source = dropEvent.source.index;
    var destination = dropEvent.destination?.index;
    var content = lesson?.content;
    var moveContent = content[source];
    content.splice(source, 1);
    content.splice(destination || 0, 0, moveContent);

    // Optimistic update (frontend only)
    mutateLesson(
      (data) => ({ ...data, lesson: { ...data!.lesson, content } } as any),
      false
    );

    // To update content order in the backend we need ids list of the newly ordered
    // content blocks
    var contentIds = content.map((block: any) => block.id);
    await reorderContent(
      courseId,
      groupId,
      lesson._id,
      contentIds,
      accessToken
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lesson-content-block">
        {(provided) => {
          console.log(lesson?.content);
          return (
            <div
              className="w-full flex flex-col gap-3 mb-6"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {lesson?.content?.map((block: any, index: number) => {
                return (
                  <Draggable
                    key={block.id}
                    draggableId={block.id}
                    index={index}
                  >
                    {(provided) => (
                      <div className="relative">
                        {/* Drag handler */}
                        <div
                          {...provided.dragHandleProps}
                          className="absolute -left-8 top-2 rounded-sm p-[2px] flex justify-center items-center cursor-pointer hover:bg-background3 active:bg-border"
                        >
                          <DragIcon size="size_5" />
                        </div>

                        {/* Block */}
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <DisplayBlock block={block} />
                        </div>
                      </div>
                    )}
                  </Draggable>
                );
              })}
            </div>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
}

interface DisplayBlockProps {
  block: {
    id: string;
    type: "paragraph" | "image";
    data: { key: string; value: any }[];
  };
}

function DisplayBlock({ block }: DisplayBlockProps): JSX.Element | null {
  if (block.type == "paragraph") return <ParagraphBlock id={block.id} />;
  if (block.type == "image") return <p>Images</p>;

  return null;
}
