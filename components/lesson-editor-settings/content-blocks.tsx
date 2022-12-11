import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { reorderContent } from "services/lesson-content.service";

import { DragIcon } from "@components/icons/drag";
import { useEditableLesson, useUser } from "@lib/hooks.lib";

import ImageBlock from "./image-block";
import ParagraphBlock from "./paragraph-block";

export default function ContentBlocks() {
  var { lesson, mutateLesson } = useEditableLesson();
  var { courseId, groupId } = useEditableLesson();
  var { accessToken } = useUser();

  //   return <div>{JSON.stringify(lesson.content)}</div>;

  return (
    <DragDropContext
      onDragEnd={async (dropEvent) => {
        // Reorder
        var source = dropEvent.source.index;
        var destination = dropEvent.destination?.index;
        var content = lesson?.content;
        var moveContent = content[source];
        content.splice(source, 1);
        content.splice(destination || 0, 0, moveContent);

        let optimisticData = {
          success: true,
          error: null,
          lesson: { ...lesson, content, lastEditedOn: new Date(Date.now()) },
        };

        await mutateLesson(async () => optimisticData, {
          optimisticData,
          revalidate: false,
        });

        var contentIds = content.map((block: any) => block.id);
        await reorderContent(
          courseId,
          groupId,
          lesson._id,
          contentIds,
          accessToken
        );
      }}
    >
      <Droppable droppableId="course-editor-sidebar">
        {(provided) => (
          <div
            className="flex flex-col gap-3 mb-6"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {lesson?.content.map((block: any, index: number) => {
              return (
                <Draggable key={block.id} draggableId={block.id} index={index}>
                  {(provided) => (
                    <div className="relative">
                      <div
                        {...provided.dragHandleProps}
                        className="absolute -left-8 top-2 rounded-sm p-[2px] flex justify-center items-center cursor-pointer hover:bg-background3 active:bg-border"
                      >
                        <DragIcon size="24" />
                      </div>

                      {/* Block */}
                      <div ref={provided.innerRef} {...provided.draggableProps}>
                        <Block block={block} />
                      </div>
                    </div>
                  )}
                </Draggable>
              );
            })}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

function Block({ block }: { block: any }) {
  if (block.type == "paragraph") {
    return <ParagraphBlock id={block.id} />;
  }
  if (block.type == "image") {
    return <ImageBlock id={block.id} />;
  }
  return null;
}
