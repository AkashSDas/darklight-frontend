import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { updateContent } from "services/lesson-content.service";

import { CameraIcon } from "@components/shared/icons";
import { getBlock, getBlockDataValue } from "@lib/content-block";
import { useEditableGroup, useEditableLesson, useUser } from "@lib/hooks.lib";

export default function ImageBlock({ id }: { id: string }): JSX.Element {
  var { accessToken } = useUser();
  var { courseId, group } = useEditableGroup();
  var { lesson, mutateLesson } = useEditableLesson();

  var block = getBlock(lesson, id);
  var URLValue = getBlockDataValue(block, "URL");

  var inputRef = useRef<HTMLInputElement>(null);
  var [loading, setLoading] = useState(false);
  var [image, setImage] = useState<File>();

  async function uploadImage(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setImage(e.target.files[0]);
    setLoading(true);

    var formData = new FormData();
    formData.append("contentImage", e.target.files[0]);
    formData.append("type", "image");
    formData.append("data", JSON.stringify([...block.data]));
    var { success, content } = await updateContent(
      courseId,
      group._id,
      lesson._id,
      id,
      formData,
      accessToken
    );

    if (success) {
      toast.success("Cover image updated");

      // Update the UI with the new content

      let updatedContent = lesson.content.map((block: any) => {
        if (block.id === content.id) return content;
        return block;
      });

      mutateLesson(
        (data) =>
          ({
            ...data,
            lesson: { ...data!.lesson, content: updatedContent },
          } as any),
        false
      );
    }
    setLoading(false);
  }

  function DisplayImage(): JSX.Element {
    return (
      <div className="relative w-full h-[500px]">
        <Image src={URLValue} alt="Block image" fill className="object-cover" />
      </div>
    );
  }

  function UploadButton(): JSX.Element {
    return (
      <button
        disabled={loading}
        onClick={() => (inputRef.current ? inputRef.current.click() : null)}
        className="w-full bg-border h-12 flex items-center rounded px-4 gap-4 font-urbanist font-medium hover:brightness-95 active:brightness-90"
      >
        <span className="icon">
          <CameraIcon size="size_4" />
        </span>
        <span>{loading ? "Uploading..." : "Add an image"}</span>
        <input
          ref={inputRef}
          hidden
          type="file"
          onChange={uploadImage}
          accept="image/x-png,image/gif,image/jpeg"
        />
      </button>
    );
  }

  return (
    <div className="w-full">
      {URLValue ? <DisplayImage /> : <UploadButton />}
    </div>
  );
}
