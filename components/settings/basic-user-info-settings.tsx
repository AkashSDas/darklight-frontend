import Image from "next/image";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { updateProfileImage } from "services/user.service";

import { CameraIcon } from "@components/shared/icons";
import { useUser } from "@lib/hooks.lib";

export default function BasicUserInfoSettings(): JSX.Element {
  return (
    <div className="w-full flex gap-16 justify-center">
      <UpdateProfileImage />
    </div>
  );
}

function UpdateProfileImage(): JSX.Element {
  var { user, accessToken } = useUser();
  var [image, setImage] = useState(null);
  var [loading, setLoading] = useState(false);
  var fileInputRef = useRef<any>(null);

  function handleFileChange(e: any) {
    var file = e.target.files[0];
    if (!file) return;
    setImage(file);
  }

  async function uploadImage() {
    if (!image) return;
    setLoading(true);
    var formData = new FormData();
    formData.append("profileImage", image);
    var { success } = await updateProfileImage(accessToken, formData);
    if (success) toast.success("Profile image updated");
    else toast.error("Failed to update profile image");
    setLoading(false);
  }

  return (
    <section className="flex flex-col gap-2 items-center">
      <div
        onClick={() => !loading && fileInputRef.current.click()}
        className="w-[200px] h-[128px] relative"
      >
        {/* Profile image */}
        <Image
          src={
            user.profileImage?.URL ??
            (image
              ? URL.createObjectURL(image)
              : "https://media.giphy.com/media/9PgvV8ale90lQwfQTZ/giphy-downsized.gif")
          }
          alt="User avatar"
          fill
          className="object-cover rounded-[41px]"
        />

        {/* Input */}
        <div className="bg-black opacity-40 cursor-pointer rounded-[41px] flex justify-center items-center w-full h-full absolute top-0 left-0">
          <span className="text-text3">{loading ? "Saving..." : "Edit"}</span>
          <input
            ref={fileInputRef}
            hidden
            type="file"
            onChange={uploadImage}
            accept="image/x-png,image/gif,image/jpeg"
          />
        </div>
      </div>

      {/* Upload button */}
      <button
        disabled={loading}
        onClick={uploadImage}
        className="px-2 h-9 flex gap-2 items-center rounded-xl border border-solid border-border"
      >
        <span className="icon">
          <CameraIcon size="size_5" />
        </span>
        <span>{loading ? "Saving..." : "Update photo"}</span>
      </button>
    </section>
  );
}
