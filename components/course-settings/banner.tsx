import Image from "next/image";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

import { useEditableCourse, useUser } from "../../lib/hooks.lib";
import { updateCourseCover } from "../../services/course.service";
import { CameraIcon } from "../icons";
import CourseEmojiInput from "./emoji-input";

function Cover({ image }: { image: any }) {
  var { course } = useEditableCourse();

  return (
    <div className="w-full max-w-[800px] h-[300px] relative">
      <Image
        src={
          image
            ? URL.createObjectURL(image)
            : course?.coverImage?.URL ??
              "https://media.giphy.com/media/KKOMG9EB7VqBq/giphy-downsized.gif"
        }
        alt="Course Cover Image"
        fill
        className="object-cover"
      />

      {/* Course emoji */}
      <div className="absolute -bottom-4 left-4 cursor-pointer text-[60px] leading-[100%] w-fit h-fit flex justify-center items-center rounded-[3px] bg-background3 px-[3px] py-[1px]">
        <CourseEmojiInput />
      </div>
    </div>
  );
}

export default function Banner() {
  var { course } = useEditableCourse();
  var { accessToken } = useUser();
  var [uploading, setUploading] = useState(false);
  var [image, setImage] = useState<any>();

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

  var inputRef = useRef<any>(null);

  return (
    <div className="w-full flex flex-col justify-center">
      {/* Cover image and course emoji */}
      <Cover image={image} />

      {/* Update course cover button */}
      <div className="self-end flex items-center gap-4 mt-2">
        <button
          disabled={uploading}
          onClick={() => inputRef.current.click()}
          className="h-9 rounded-xl flex items-center gap-2 px-2 hover:bg-background3 active:bg-border"
        >
          <CameraIcon size="18" />
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
    </div>
  );
}
