import { useRouter } from "next/router";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

import CourseEditorLayout from "@components/shared/course-editor-layout";
import EmojiPicker from "@components/shared/emoji-picker";
import Markdown from "@components/shared/markdown";
import { useAppDispatch, useAppSelector, useCourse, useDropdown, useLesson, useModule, useResizeTextareaHeight } from "@lib/hooks";
import { selectActiveLesson, selectPreview, updateActiveLesson } from "@store/_course/slice";
import { createModuleThunk } from "@store/_course/thunk";

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

  function EmojiInput() {
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
            onSelect={(emoji) => {
              dispatch(updateActiveLesson({ ...lesson, emoji: emoji.native }));
              setIsOpen(false);
            }}
            handleClose={() => setIsOpen(false)}
          />
        )}
      </div>
    );
  }

  /**
   * TODO: update sidebar lesson title/emoji and update active lesson
   */
  function TitleInput({ title }: { title: string }) {
    var [value, setValue] = useState(title);
    var { ref } = useResizeTextareaHeight(value);

    return (
      <textarea
        ref={ref}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        onKeyDownCapture={(e) => {
          if (e.key == "Enter") e.preventDefault();
        }}
        placeholder="Untitled"
        className="w-full outline-none resize-none placeholder:text-[#E9E9E9] font-gilroy font-extrabold text-[39.1px] leading-[100%]"
      />
    );
  }

  function DescriptionInput({ description }: { description: string }) {
    var [value, setValue] = useState(description);
    var { ref } = useResizeTextareaHeight(description ?? "");

    return (
      <textarea
        ref={ref}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        onKeyDownCapture={(e) => {
          if (e.key == "Enter") e.preventDefault();
        }}
        placeholder="Add a description"
        className="w-full outline-none resize-none placeholder:text-[#E9E9E9] font-urbanist font-medium"
      />
    );
  }

  function Divider() {
    return <div className="h-[1px] bg-[#F5F5F5]"></div>;
  }

  function ContentOptions() {
    var contents = [
      { label: "Paragraph", src: "/content-types/paragraph.png" },
      { label: "Heading 1", src: "/content-types/h1.png" },
      { label: "Heading 2", src: "/content-types/h2.png" },
      { label: "Heading 3", src: "/content-types/h3.png" },
      { label: "Blutted list", src: "/content-types/bulleted-list.png" },
      { label: "Numbered list", src: "/content-types/numbered-list.png" },
      { label: "Quote", src: "/content-types/quote.png" },
      { label: "Divider", src: "/content-types/divider.png" },
      { label: "Callout", src: "/content-types/callout.png" },
      { label: "Code", src: "/content-types/code.png" },
      { label: "Image", src: "/content-types/image.png" },
    ];

    return (
      <div className="flex flex-row gap-4 p-1 overflow-x-scroll">
        {contents.map((content) => (
          <div
            key={content.label}
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
        <EmojiInput />
        <TitleInput title={lesson.title ?? ""} />
        <DescriptionInput description={lesson.description ?? ""} />
        <div className="mt-4 flex flex-col gap-4">
          <ContentOptions />
          <Divider />
          <H1 />
          <Paragraph />
          <H2 />
          <Paragraph />
          <Paragraph />

          <H3 />
        </div>
      </div>
    </div>
  );
}

function H1() {
  var [value, setValue] = useState("");
  var preview = useAppSelector(selectPreview);

  return (
    <div>
      {!preview ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add text"
          className="w-full outline-none resize-none placeholder:text-[#E9E9E9] font-urbanist font-medium"
        />
      ) : (
        <h2 className="font-urbanist font-bold text-[39.1px]">{value}</h2>
      )}
    </div>
  );
}

function H2() {
  var [value, setValue] = useState("");
  var preview = useAppSelector(selectPreview);

  return (
    <div>
      {!preview ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add text"
          className="w-full outline-none resize-none placeholder:text-[#E9E9E9] font-urbanist font-medium"
        />
      ) : (
        <h3 className="font-urbanist font-bold text-[31.3px]">{value}</h3>
      )}
    </div>
  );
}

function H3() {
  var [value, setValue] = useState("");
  var preview = useAppSelector(selectPreview);

  return (
    <div>
      {!preview ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add text"
          className="w-full outline-none resize-none placeholder:text-[#E9E9E9] font-urbanist font-medium"
        />
      ) : (
        <h4 className="font-urbanist font-bold text-[25px]">{value}</h4>
      )}
    </div>
  );
}

function Paragraph() {
  var [value, setValue] = useState("");
  var preview = useAppSelector(selectPreview);

  return (
    <div>
      {!preview ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add text"
          className="w-full outline-none resize-none placeholder:text-[#E9E9E9] font-urbanist font-medium"
        />
      ) : (
        <Markdown>{value.length == 0 ? "Not text here" : value}</Markdown>
      )}
    </div>
  );
}

LessonPage.getLayout = function getLayout(page) {
  return <CourseEditorLayout>{page}</CourseEditorLayout>;
};
