import { useState } from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { toast } from "react-hot-toast";
import { deleteContent, reorderContent } from "services/lesson-content.service";

import { DragIcon, TrashIcon } from "@components/shared/icons";
import { useEditableLesson, useUser } from "@lib/hooks.lib";

import ImageBlock from "./image-block";
import ParagraphBlock from "./paragraph-block";

export default function EditContentBlocks(): JSX.Element {
  var { accessToken } = useUser();
  var { lesson, mutateLesson, courseId, groupId } = useEditableLesson();
  var [loading, setLoading] = useState(false);

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

  async function deleteContentBlock(blockData: any) {
    console.log(blockData);
    if (loading) return;
    setLoading(true);

    mutateLesson(
      (data) =>
        ({
          ...data,
          lesson: {
            ...data!.lesson,
            content: data!.lesson.content.filter(
              (block: any) => block.id != blockData.id
            ),
          },
        } as any),
      false
    );

    var { success } = await deleteContent(
      courseId,
      groupId,
      lesson._id,
      { id: blockData.id, type: blockData.type, data: blockData.data },
      accessToken
    );

    if (success) toast.success("Content block deleted");
    else toast.error("Failed to delete content block");

    setLoading(false);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lesson-content-block">
        {(provided) => {
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
                      <div className="relative group">
                        {/* Drag handler */}
                        <div
                          {...provided.dragHandleProps}
                          className="icon hidden group-hover:flex absolute -left-5 top-1 rounded-sm p-[2px] justify-center items-center cursor-pointer hover:bg-background3 active:bg-border"
                        >
                          <DragIcon size="size_4" />
                        </div>

                        {/* Delete content block button */}
                        <div
                          onClick={() => deleteContentBlock(block)}
                          className="icon hidden group-hover:flex absolute -left-10 top-1 rounded-sm p-[2px] justify-center items-center cursor-pointer hover:bg-background3 active:bg-border"
                        >
                          <TrashIcon size="size_4" />
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
  if (block.type == "image") return <ImageBlock id={block.id} />;

  return null;
}
