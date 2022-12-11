import Image from "next/image";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { updateContent } from "services/lesson-content.service";

import { CameraIcon } from "@components/icons/camera";
import { ContentBlockType } from "@lib/content-block";
import { useEditableGroup, useEditableLesson, useUser } from "@lib/hooks.lib";

export default function ImageBlock({ id }: { id: string }) {
  var { lesson, mutateLesson } = useEditableLesson();
  var { courseId, group } = useEditableGroup();
  var { accessToken } = useUser();

  var block = lesson.content.find((block: any) => block.id == id);
  var URL = block.data.find((block: any) => block.key == "URL").value;

  var inputRef = useRef<any>(null);
  var [uploading, setUploading] = useState(false);
  var [image, setImage] = useState<any>();

  async function uploadImage(e: any) {
    var file = e.target.files[0];
    setImage(file);

    setUploading(true);
    var formData = new FormData();
    formData.append("contentImage", file);
    formData.append("type", ContentBlockType.IMAGE);
    formData.append("data", JSON.stringify([...block.data]));
    var { success } = await updateContent(
      courseId,
      group._id,
      lesson._id,
      id,
      formData,
      accessToken
    );

    if (success) toast.success("Cover image updated");
    setUploading(false);
  }

  return (
    <div className="w-full">
      {URL ? (
        <div className="relative w-full h-[500px]">
          <Image src={URL} alt="Block image" fill className="object-cover" />
        </div>
      ) : (
        <button
          disabled={uploading}
          onClick={() => inputRef.current.click()}
          className="w-full bg-border h-12 flex items-center rounded px-4 gap-4 font-urbanist font-medium hover:brightness-95 active:brightness-90"
        >
          <CameraIcon size="18" />
          <span>Add a image</span>
          <input
            ref={inputRef}
            hidden
            type="file"
            onChange={uploadImage}
            accept="image/x-png,image/gif,image/jpeg"
          />
        </button>
      )}
    </div>
  );
}
