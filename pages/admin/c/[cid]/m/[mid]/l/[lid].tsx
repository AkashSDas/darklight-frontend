import debounce from "lodash.debounce";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import CourseEditorLayout from "@components/shared/course-editor-layout";
import EmojiPicker from "@components/shared/emoji-picker";
import Markdown from "@components/shared/markdown";
import { useAppDispatch, useAppSelector, useCourse, useDropdown, useLesson, useModule, useResizeTextareaHeight, useSaveLessonContentData } from "@lib/hooks";
import { deleteContent, Lesson, selectActiveLesson, selectPreview, updateActiveLesson, updateCourse, updateLessonInModule } from "@store/_course/slice";
import { addContentThunk, createModuleThunk, deleteContentThunk, updateContentThunk, updateLessonMetadataThunk } from "@store/_course/thunk";
import { userExistsThunk } from "@store/_user/thunk";

/**
 * TODO: update sidebar lesson title/emoji and update active lesson
 */
function TitleInput({
  moduleLesson,
  title,
}: {
  moduleLesson: Lesson;
  title: string;
}) {
  var { ref } = useResizeTextareaHeight(title);
  var dispatch = useAppDispatch();
  var router = useRouter();
  var lesson = useAppSelector(selectActiveLesson);

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

  return (
    <textarea
      ref={ref}
      onChange={(e) => {
        dispatch(updateActiveLesson({ ...lesson, title: e.target.value }));
        dispatch(
          updateLessonInModule({
            lesson: { ...moduleLesson, title: e.target.value },
            moduleId: router.query?.mid as string,
          })
        );
      }}
      value={title}
      onKeyDownCapture={(e) => {
        if (e.key == "Enter") e.preventDefault();
      }}
      placeholder="Untitled"
      className="w-full outline-none resize-none placeholder:text-[#E9E9E9] font-gilroy font-extrabold text-[39.1px] leading-[100%]"
    />
  );
}

function DescriptionInput({
  moduleLesson,
  description,
}: {
  moduleLesson: Lesson;
  description: string;
}) {
  var { ref } = useResizeTextareaHeight(description ?? "");
  var router = useRouter();
  var dispatch = useAppDispatch();
  var lesson = useAppSelector(selectActiveLesson);

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
            lesson: { ...moduleLesson, description: e.target.value },
            moduleId: router.query?.mid as string,
          })
        );
      }}
      value={description}
      onKeyDownCapture={(e) => {
        if (e.key == "Enter") e.preventDefault();
      }}
      placeholder="Add a description"
      className="w-full outline-none resize-none placeholder:text-[#E9E9E9] font-urbanist font-medium"
    />
  );
}

export default function LessonPage() {
  var router = useRouter();
  var dispatch = useAppDispatch();
  var { loading, course, courseId } = useCourse();
  var { moduleId, moduleLoading, moduleData } = useModule();
  var { lesson, lessonId, lessonLoading } = useLesson();

  if (
    loading ||
    !courseId ||
    !course ||
    moduleLoading ||
    !moduleId ||
    !moduleData ||
    !lesson ||
    !lessonId ||
    lessonLoading
  ) {
    return (
      <div>
        <div className="flex justify-center items-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"></div>
        </div>
      </div>
    );
  }

  async function createNewModule() {
    var id = (await dispatch(createModuleThunk(courseId))).payload;
    if (id) router.push(`/admin/c/${courseId}/m/${id}`);
  }

  return <LessonEditor />;
}

function LessonEditor() {
  var dispatch = useAppDispatch();
  var { isOpen, setIsOpen, wrapperRef } = useDropdown();
  var lesson = useAppSelector(selectActiveLesson);
  var router = useRouter();

  function EmojiInput({ moduleLesson }: { moduleLesson: Lesson }) {
    return (
      <div
        onClick={() => setIsOpen(true)}
        ref={wrapperRef}
        className="relative mb-3 w-[50px] h-[50px]"
      >
        <div className="flex justify-center items-center w-[50px] h-[50px] text-[50px] cursor-pointer hover:bg-gray-100 rounded-lg font-urbanist">
          {lesson.emoji ?? "✌🏼"}
        </div>
        {isOpen && (
          <EmojiPicker
            onSelect={async (emoji) => {
              dispatch(
                updateLessonInModule({
                  lesson: { ...moduleLesson, emoji: emoji.native },
                  moduleId: router.query?.mid as string,
                })
              );
              dispatch(updateActiveLesson({ ...lesson, emoji: emoji.native }));
              setIsOpen(false);
              await dispatch(updateLessonMetadataThunk());
            }}
            handleClose={() => setIsOpen(false)}
          />
        )}
      </div>
    );
  }

  function Divider() {
    return <div className="h-[1px] bg-[#F5F5F5]"></div>;
  }

  function ContentOptions() {
    var dispatch = useAppDispatch();
    var lesson = useAppSelector(selectActiveLesson);

    var contents = [
      {
        id: "paragraph",
        label: "Paragraph",
        src: "/content-types/paragraph.png",
      },
      // {id: "paragraph", label: "Heading 1", src: "/content-types/h1.png" },
      // {id: "paragraph", label: "Heading 2", src: "/content-types/h2.png" },
      // {id: "paragraph", label: "Heading 3", src: "/content-types/h3.png" },
      // {id: "paragraph", label: "Blutted list", src: "/content-types/bulleted-list.png" },
      // {id: "paragraph", label: "Numbered list", src: "/content-types/numbered-list.png" },
      // {id: "paragraph", label: "Quote", src: "/content-types/quote.png" },
      { id: "divider", label: "Divider", src: "/content-types/divider.png" },
      // {id: "paragraph", label: "Callout", src: "/content-types/callout.png" },
      // {id: "paragraph", label: "Code", src: "/content-types/code.png" },
      // {id: "paragraph", label: "Image", src: "/content-types/image.png" },
    ];

    return (
      <div className="flex flex-row gap-4 p-1 overflow-x-scroll">
        {contents.map((content) => (
          <div
            key={content.id}
            onClick={async () => {
              dispatch(
                updateActiveLesson({
                  ...lesson,
                  contents: [...lesson.contents, createContent(content.id)],
                })
              );

              var c = createContent(content.id);
              await dispatch(
                addContentThunk({
                  addAt: lesson.contents.length,
                  type: c.type,
                  data: c.data,
                })
              );
            }}
            className="flex-grow w-full rounded-md p-2 flex flex-col gap-3 cursor-pointer hover:bg-slate-100"
          >
            <img
              src={content.src}
              alt={content.label}
              className="w-[35px] h-[33px] object-cover"
            />
            <div className="font-urbanist text-[14px] w-max">
              {content.label}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[600px] w-full">
        <div className="flex justify-between items-center">
          <EmojiInput moduleLesson={lesson} />

          <div className="flex items-center gap-2">
            <span>Make it free?</span>

            <div className="relative max-w-[300px] w-max flex justify-end">
              <div
                onClick={async () => {
                  dispatch(
                    updateActiveLesson({ ...lesson, isFree: !lesson.isFree })
                  );
                  await dispatch(updateLessonMetadataThunk());
                }}
                className="flex justify-between items-center cursor-pointer"
              >
                <div
                  className={`w-14 h-8 ${
                    !lesson.isFree ? "bg-gray-300" : "bg-blue2"
                  }  rounded-full flex-shrink-0 p-1`}
                >
                  <div
                    className={`bg-white w-6 h-6 rounded-full shadow-md transform ${
                      lesson.isFree ? "translate-x-6" : ""
                    } duration-300 ease-in-out`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <TitleInput moduleLesson={lesson} title={lesson.title ?? ""} />
        <DescriptionInput
          moduleLesson={lesson}
          description={lesson.description ?? ""}
        />
        <div className="mt-4 mb-11 flex flex-col gap-4">
          <ContentOptions />
          <Divider />
          {lesson.contents.map((content, index) => (
            <DisplayContent key={index} index={index} id={content.type} />
          ))}
        </div>
      </div>
    </div>
  );
}

function DisplayContent({ id, index }) {
  if (id == "paragraph") {
    return <Paragraph index={index} />;
  }
  if (id == "divider") {
    return <Divider index={index} />;
  }
  return <div>{id}</div>;
}

function Divider({ index }) {
  var dispatch = useAppDispatch();

  return (
    <div className="relative">
      <div
        onClick={async () => {
          dispatch(deleteContent({ deleteAt: index }));
          // await dispatch(deleteContentThunk({ deleteAt: index }));
        }}
        className="top-0 left-[-32px] rounded w-6 h-6 flex items-center justify-center absolute hover:bg-slate-100 cursor-pointer"
      >
        🗑️ {index}
      </div>

      <div className="h-[1px] bg-[#F5F5F5]"></div>
    </div>
  );
}

function Paragraph({ index }) {
  var lessons = useAppSelector(selectActiveLesson);
  var content = lessons.contents[index] as ParagraphContent;
  var text = content.data.filter((c) => c.key == "text")[0].value;
  var preview = useAppSelector(selectPreview);
  var dispatch = useAppDispatch();
  var activeLesson = useAppSelector(selectActiveLesson);

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
  }, [save, text]);

  function setValue(value: string) {
    // TODO: fix last edited on
    dispatch(
      updateActiveLesson({
        ...lessons,
        contents: [
          ...lessons.contents.slice(0, index),
          {
            ...lessons.contents[index],
            data: [{ key: "text", value }],
          },
          ...lessons.contents.slice(index + 1),
        ],
        lastEditedOn: new Date().toISOString(),
      })
    );
  }

  return (
    <div className="relative">
      <div
        onClick={async () => {
          dispatch(deleteContent({ deleteAt: index }));
          await dispatch(deleteContentThunk({ deleteAt: index }));
        }}
        className="top-0 left-[-32px] rounded w-6 h-6 flex items-center justify-center absolute hover:bg-slate-100 cursor-pointer"
      >
        🗑️ {index}
      </div>

      <div>
        {preview ? (
          <Markdown>{text}</Markdown>
        ) : (
          <ParagraphEditor value={text} setValue={setValue} />
        )}
      </div>
    </div>
  );
}

function ParagraphEditor({ value, setValue }) {
  var { ref } = useResizeTextareaHeight(value);

  return (
    <textarea
      ref={ref}
      value={value}
      placeholder="Start typing..."
      onChange={(e) => setValue(e.target.value)}
      onKeyDownCapture={(e) => {
        if (e.key == "Enter") e.preventDefault();
      }}
      className="w-full outline-none resize-none placeholder:text-[#E9E9E9] font-urbanist font-medium"
    />
  );
}

interface ParagraphContent {
  type: "paragraph";
  data: { key: string; value: string }[];
}

interface DividerContent {
  type: "divider";
  data: [];
}

function createContent(id) {
  switch (id) {
    case "paragraph":
      return {
        type: "paragraph",
        data: [{ key: "text", value: "Hello world" }],
      } as ParagraphContent;
    case "divider":
      return {
        type: "divider",
      } as DividerContent;
    default:
      return null;
  }
}

LessonPage.getLayout = function getLayout(page) {
  return <CourseEditorLayout>{page}</CourseEditorLayout>;
};
