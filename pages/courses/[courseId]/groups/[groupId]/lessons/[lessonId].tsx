import { ChangeEvent, ReactElement, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { updateLessonVideo } from "services/lesson.service";

import ContentBlockOptions from "@components/lesson-editor/content-block-options";
import EditContentBlocks from "@components/lesson-editor/edit-content-blocks";
import LessonEmojiInput from "@components/lesson-editor/emoji-input";
import SearchBlockInput from "@components/lesson-editor/search-block-input";
import LessonTitleInput from "@components/lesson-editor/title-input";
import CourseEditorLayout from "@components/shared/course-editor-layout";
import { AddVideoIcon, UploadIcon } from "@components/shared/icons";
import { useEditableLesson, useUser } from "@lib/hooks.lib";

export default function EditLessonPage(): JSX.Element {
  function Divider(): JSX.Element {
    return <hr className="bg-border my-2 h-[1px] w-full" />;
  }

  function MainContent(): JSX.Element {
    return (
      <main className="mr-[300px] w-full flex flex-col gap-2 items-center">
        <div className="px-16 w-full max-w-[800px] flex flex-col gap-2 items-start">
          <LessonEmojiInput />
          <LessonTitleInput />
          <LessonVideo />
          <Divider />
          <EditContentBlocks />
        </div>
      </main>
    );
  }

  function ActionPanel(): JSX.Element {
    return (
      <aside className="pb-24 w-full right-0 max-w-[300px] flex flex-col gap-6 py-4 fixed overflow-y-scroll h-full border-l border-solid border-l-border">
        <SearchBlockInput />
        <ContentBlockOptions />
      </aside>
    );
  }

  return (
    <div className="flex relative">
      <MainContent />
      <ActionPanel />
    </div>
  );
}

function LessonVideo(): JSX.Element {
  var { lesson, mutateLesson } = useEditableLesson();
  var inputRef = useRef<HTMLInputElement>(null);
  var videoRef = useRef<HTMLVideoElement>(null);
  var [video, setVideo] = useState<File>();
  var { accessToken } = useUser();
  var [loading, setLoading] = useState(false);

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setVideo(e.target.files[0]);
  }

  async function uploadVideo() {
    if (!video) return;
    var formData = new FormData();
    formData.append("lessonVideo", video);
    setLoading(true);
    var response = await updateLessonVideo(
      lesson.course,
      lesson.group,
      lesson._id,
      accessToken,
      formData
    );
    setLoading(false);

    if (response.success) {
      toast.success("Video uploaded successfully");
      mutateLesson(
        (data) =>
          ({
            ...data,
            lesson: { ...data!.lesson, video: { URL: response?.videoURL } },
          } as any),
        false
      );

      setVideo(undefined);
    } else {
      toast.error("Failed to upload video");
    }
  }

  useEffect(() => {
    videoRef.current?.load();
  }, [video]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        {lesson.video && (
          <>
            {/* Add button - just to display video */}
            <button
              onClick={() => inputRef.current?.click()}
              disabled={loading}
              className="h-10 rounded-xl px-4 flex items-center gap-2 text-sm"
            >
              <span className="icon">
                <AddVideoIcon size="size_4" />
              </span>
              <span>{video || lesson.video ? "Update" : "Add"} video</span>
              <input
                ref={inputRef}
                hidden
                type="file"
                onChange={handleChange}
                accept="video/mp4"
              />
            </button>

            {/* Upload button */}
            {video && (
              <button
                disabled={loading}
                onClick={uploadVideo}
                className="h-10 rounded-xl px-4 flex items-center gap-2 text-sm"
              >
                <span className="icon">
                  <UploadIcon size="size_4" />
                </span>
                <span>{loading ? "Loading..." : "Upload video"}</span>
              </button>
            )}
          </>
        )}
      </div>

      <div>
        {lesson.video || video ? (
          <video ref={videoRef} className="w-full" controls>
            <source
              src={
                video
                  ? URL.createObjectURL(video)
                  : lesson.video
                  ? lesson.video.URL
                  : null
              }
              type="video/mp4"
            />
          </video>
        ) : null}
      </div>
    </div>
  );
}

EditLessonPage.getLayout = function getLayout(page: ReactElement) {
  return <CourseEditorLayout context="lesson">{page}</CourseEditorLayout>;
};
