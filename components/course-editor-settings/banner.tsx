import Image from "next/image";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { updateCourseCover } from "services/course.service";

import { CameraIcon } from "@components/shared/icons";
import { useEditableCourse, useUser } from "@lib/hooks.lib";

import CourseEmojiInput from "./course-emoji-input";

export default function Banner(): JSX.Element {
  var { course } = useEditableCourse();
  var { accessToken } = useUser();
  var inputRef = useRef<any>(null);
  var [image, setImage] = useState<any>();
  var [uploading, setUploading] = useState(false);

  async function uploadImage(e: any) {
    var file = e.target.files[0];
    setImage(file);
    setUploading(true);

    var formData = new FormData();
    formData.append("coverImage", file);
    var { success } = await updateCourseCover(
      accessToken,
      course._id,
      formData
    );

    if (success) toast.success("Cover image updated");
    setUploading(false);
  }

  return (
    <section className="w-full flex flex-col justify-center">
      <UpdateCourseImageAndEmoji img={image} />

      {/* Update course cover button */}
      <div className="self-end mt-2 flex gap-4 items-center">
        <button
          className="h-9 rounded-xl flex items-center gap-2 px-2 hover:bg-background3 active:bg-border"
          disabled={uploading}
          onClick={() => inputRef.current.click()}
        >
          <span className="icon">
            <CameraIcon size="size_4" />
          </span>

          <span className="text-sm">
            {uploading ? "Uploading" : "Update cover"}
          </span>

          <input
            ref={inputRef}
            hidden
            type="file"
            onChange={uploadImage}
            accept="image/x-png,image/gif,image/jpeg"
          />
        </button>
      </div>
    </section>
  );
}

interface Props {
  img?: Blob | null;
}

function UpdateCourseImageAndEmoji({ img }: Props): JSX.Element {
  var { course } = useEditableCourse();

  function DisplayImage(): JSX.Element {
    return (
      <Image
        src={
          img
            ? URL.createObjectURL(img)
            : course?.coverImage?.URL ??
              "https://media.giphy.com/media/KKOMG9EB7VqBq/giphy-downsized.gif"
        }
        alt="Course cover image"
        fill
        className="object-cover"
      />
    );
  }

  return (
    <div className="w-full h-[300px] relative">
      <DisplayImage />
      <CourseEmojiInput />
    </div>
  );
}
