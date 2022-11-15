import debounce from "lodash.debounce";
import { useRouter } from "next/router";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import CourseEditorLayout from "@components/shared/course-editor-layout";
import EmojiPicker from "@components/shared/emoji-picker";
import Markdown from "@components/shared/markdown";
import SwitchButton from "@components/shared/switch-button";
import { useAppDispatch, useAppSelector, useCourse, useDropdown, useLesson, useModule, useResizeTextareaHeight } from "@lib/hooks";
import { createContent, lessonContentOptions, ParagraphContent } from "@lib/lesson-editor";
import { deleteContent, Lesson, selectActiveLesson, selectPreview, updateActiveLesson, updateCourse, updateLessonInModule } from "@store/_course/slice";
import { addContentThunk, deleteContentThunk, deleteLessonThunk, reorderContentThunk, updateContentThunk, updateLessonMetadataThunk } from "@store/_course/thunk";

export default function LessonPage() {
  var { loading, course, courseId } = useCourse();
  var { moduleId, moduleLoading, moduleData } = useModule();
  var { lesson, lessonId, lessonLoading } = useLesson();
  var isLoading =
    loading ||
    !courseId ||
    !course ||
    moduleLoading ||
    !moduleId ||
    !moduleData ||
    !lesson ||
    !lessonId ||
    lessonLoading;

  if (isLoading) {
    return (
      <div>
        <div className="flex justify-center items-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"></div>
        </div>
      </div>
    );
  }

  return <LessonEditor />;
}

LessonPage.getLayout = function getLayout(page) {
  return <CourseEditorLayout>{page}</CourseEditorLayout>;
};

function LessonEditor() {
  var lesson = useAppSelector(selectActiveLesson);
  var dispatch = useAppDispatch();

  async function toggleLessonFree() {
    dispatch(updateActiveLesson({ ...lesson, isFree: !lesson.isFree }));
    await dispatch(updateLessonMetadataThunk());
  }

  function Divider() {
    return <div className="h-[1px] bg-[#F5F5F5]"></div>;
  }

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[600px] w-full">
        <div className="flex justify-between items-center">
          <EmojiInput />

          <div className="flex items-center gap-2">
            <span>Free?</span>
            <SwitchButton checked={lesson.isFree} onChange={toggleLessonFree} />
          </div>

          <DeleteCourseButton />
        </div>

        <TitleInput />
        <DescriptionInput />
        <div className="mt-4 mb-11 flex flex-col gap-4">
          <ContentOptions />
          <Divider />
          <LessonContent />
        </div>
      </div>
    </div>
  );
}

// ===========================
// Main lesson inputs
// ===========================

function EmojiInput() {
  var router = useRouter();
  var { isOpen, setIsOpen, wrapperRef } = useDropdown();
  var lesson = useAppSelector(selectActiveLesson);
  var dispatch = useAppDispatch();

  async function handleEmojiSelect(emoji: any) {
    dispatch(
      updateLessonInModule({
        lesson: { ...lesson, emoji: emoji.native },
        moduleId: router.query?.mid as string,
      })
    );
    dispatch(updateActiveLesson({ ...lesson, emoji: emoji.native }));
    setIsOpen(false);
    await dispatch(updateLessonMetadataThunk());
  }

  return (
    <div
      onClick={() => setIsOpen(true)}
      ref={wrapperRef}
      className="relative mb-3 w-[50px] h-[50px]"
    >
      {/* Display current emoji */}
      <div className="flex justify-center items-center w-[50px] h-[50px] text-[50px] cursor-pointer hover:bg-gray-100 rounded-lg font-urbanist">
        {lesson.emoji ?? "✌🏼"}
      </div>

      {/* Emoji dropdown */}
      {isOpen && (
        <EmojiPicker
          onSelect={handleEmojiSelect}
          handleClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

function TitleInput() {
  var router = useRouter();
  var { ref } = useResizeTextareaHeight(lesson?.title ?? "");
  var lesson = useAppSelector(selectActiveLesson);
  var dispatch = useAppDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  var save = useCallback(
    debounce(async () => {
      await dispatch(updateLessonMetadataThunk());
    }, 500),
    []
  );

  useEffect(() => {
    save();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson?.title]);

  function updateLessonTitleState(e: ChangeEvent<HTMLTextAreaElement>) {
    dispatch(updateActiveLesson({ ...lesson, title: e.target.value }));
    dispatch(
      updateLessonInModule({
        lesson: { ...lesson, title: e.target.value },
        moduleId: router.query?.mid as string,
      })
    );
  }

  return (
    <textarea
      ref={ref}
      onChange={updateLessonTitleState}
      value={lesson?.title ?? ""}
      onKeyDownCapture={(e) => {
        if (e.key == "Enter") e.preventDefault();
      }}
      placeholder="Untitled"
      className="w-full outline-none resize-none placeholder:text-[#E9E9E9] font-gilroy font-extrabold text-[39.1px] leading-[100%]"
    />
  );
}

function DescriptionInput() {
  var router = useRouter();
  var { ref } = useResizeTextareaHeight(lesson?.description ?? "");
  var lesson = useAppSelector(selectActiveLesson);
  var dispatch = useAppDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  var save = useCallback(
    debounce(async () => {
      await dispatch(updateLessonMetadataThunk());
    }, 500),
    []
  );

  useEffect(() => {
    save();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson?.description]);

  return (
    <textarea
      ref={ref}
      onChange={(e) => {
        dispatch(
          updateActiveLesson({ ...lesson, description: e.target.value })
        );
        dispatch(
          updateLessonInModule({
            lesson: { ...lesson, description: e.target.value },
            moduleId: router.query?.mid as string,
          })
        );
      }}
      value={lesson?.description ?? ""}
      onKeyDownCapture={(e) => {
        if (e.key == "Enter") e.preventDefault();
      }}
      placeholder="Add a description"
      className="w-full outline-none resize-none placeholder:text-[#E9E9E9] font-urbanist font-medium"
    />
  );
}

function DeleteCourseButton() {
  var router = useRouter();
  var dispatch = useAppDispatch();

  return (
    <button
      onClick={async () => {
        await dispatch(deleteLessonThunk());
        router.push(`/admin/c/${router.query.cid}/m/${router.query.mid}`);
      }}
      className="h-11 px-6 rounded-2xl bg-[#FFECEB] text-[#EA4335]"
    >
      Delete
    </button>
  );
}

function ContentOptions() {
  var dispatch = useAppDispatch();
  var lesson = useAppSelector(selectActiveLesson);

  async function addContentBlock(content: typeof lesson.contents[number]) {
    var newContentBlock = createContent(content.id);

    // Update state
    dispatch(
      updateActiveLesson({
        ...lesson,
        contents: [...lesson.contents, newContentBlock],
      })
    );

    // Add content in database
    await dispatch(
      addContentThunk({
        addAt: lesson.contents.length,
        type: content.id,
        data: content.data,
      })
    );
  }

  return (
    <div className="flex flex-row gap-4 p-1 overflow-x-scroll">
      {lessonContentOptions.map((content) => (
        <div
          key={content.id}
          onClick={() => addContentBlock(content)}
          className="flex-grow w-full rounded-md p-2 flex flex-col gap-3 cursor-pointer hover:bg-slate-100"
        >
          <img
            src={content.src}
            alt={content.label}
            className="w-[35px] h-[33px] object-cover"
          />
          <div className="font-urbanist text-[14px] w-max">{content.label}</div>
        </div>
      ))}
    </div>
  );
}

// ===================================
// Lesson Content Blocks
// ===================================

function DisplayContent({ id, index }) {
  if (id == "paragraph") {
    return <Paragraph index={index} />;
  }
  if (id == "divider") {
    return <Divider index={index} />;
  }
  return <div>{id}</div>;
}

function Paragraph({ index }) {
  var preview = useAppSelector(selectPreview);
  var dispatch = useAppDispatch();

  // paragraph text
  var lesson = useAppSelector(selectActiveLesson);
  var content = lesson.contents[index] as ParagraphContent;
  var text = content.data.filter((c) => c.key == "text")[0].value;
  var [val, setVal] = useState(text);
  var { ref } = useResizeTextareaHeight(text);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  var save = useCallback(
    debounce(async (index, data, type) => {
      await dispatch(
        updateContentThunk({
          updateAt: index,
          data: data,
          type: type,
        })
      );
    }, 500),
    []
  );

  useEffect(() => {
    save(index, content.data, content.type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [val]);

  function handleChange(value: string) {
    setVal(value);

    dispatch(
      updateActiveLesson({
        ...lesson,
        contents: [
          ...lesson.contents.slice(0, index),
          {
            ...lesson.contents[index],
            data: [{ key: "text", value }],
          },
          ...lesson.contents.slice(index + 1),
        ],
        lastEditedOn: new Date().toISOString(),
      })
    );
  }

  return (
    <div>
      {preview ? (
        <Markdown>{text}</Markdown>
      ) : (
        <textarea
          ref={ref}
          value={text}
          placeholder="Start typing..."
          onChange={(e) => handleChange(e.target.value)}
          onKeyDownCapture={(e) => {
            if (e.key == "Enter") e.preventDefault();
          }}
          className="w-full outline-none resize-none placeholder:text-[#E9E9E9] font-urbanist font-medium"
        />
      )}
    </div>
  );
}

function Divider({ index }) {
  return <div className="h-[1px] bg-[#F5F5F5]"></div>;
}

// ===================================
// Lesson
// ===================================

function LessonContent() {
  var lesson = useAppSelector(selectActiveLesson);
  var dispatch = useAppDispatch();

  return (
    <DragDropContext
      onDragEnd={async (dropEvent) => {
        // Reorder
        var source = dropEvent.source.index;
        var destination = dropEvent.destination?.index;
        var content = (lesson.contents.slice() || []) as Lesson[];
        var moveLesson = content[source];
        content.splice(source, 1);
        content.splice(destination || 0, 0, moveLesson);
        dispatch(updateActiveLesson({ ...lesson, contents: content }));
        await dispatch(reorderContentThunk({ content: content }));
      }}
    >
      <Droppable droppableId="sidebar-modules">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {lesson.contents.map((content, index) => (
              <Draggable
                key={index}
                draggableId={index.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    className="relative group"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      onClick={async () => {
                        dispatch(deleteContent({ deleteAt: index }));
                        await dispatch(deleteContentThunk({ deleteAt: index }));
                      }}
                      className="flex top-0 left-[-32px] rounded w-6 h-6 items-center justify-center absolute hover:bg-slate-100 cursor-pointer"
                    >
                      🗑️
                    </div>

                    <div
                      {...provided.dragHandleProps}
                      className="flex top-0 left-[-56px] rounded w-6 h-6 items-center justify-center absolute hover:bg-slate-100 cursor-pointer"
                    >
                      📀
                    </div>

                    <DisplayContent
                      key={index}
                      index={index}
                      id={content.type}
                    />
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
