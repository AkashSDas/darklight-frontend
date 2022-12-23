import { useFormik } from "formik";
import Image from "next/image";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { updateDetails, updateProfileImage } from "services/user.service";

import { FormLabel } from "@components/shared/form-label";
import { CameraIcon } from "@components/shared/icons";
import { useUser } from "@lib/hooks.lib";
import { UpdateDetailsInput } from "@lib/user.lib";

export default function BasicUserInfoSettings(): JSX.Element {
  return (
    <div className="w-full flex gap-16 justify-center">
      <UpdateProfileImage />
      <UpdateUserDetailsForm />
    </div>
  );
}

function UpdateUserDetailsForm(): JSX.Element {
  var { user, accessToken } = useUser();
  var [loading, setLoading] = useState(false);

  var formik = useFormik<UpdateDetailsInput>({
    initialValues: {
      fullName: user.fullName ?? "",
      username: user.username,
      email: user.email,
    },
    onSubmit: async function onSubmit(values) {
      setLoading(true);
      var { success } = await updateDetails(accessToken, values);
      if (success) toast.success("Details updated successfully");
      else toast.error("Error updating details");
      setLoading(false);
    },
  });

  var displayUsernameError = formik.touched.username && formik.errors.username;
  var displayEmailError = formik.touched.email && formik.errors.email;
  var displayFullnameError = formik.touched.fullName && formik.errors.fullName;

  return (
    <section className="w-full max-w-[360px]">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-[18px]">
        {/* Fullname Input */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <FormLabel htmlFor="fullname" label="Fullname" variant="regular" />

            {displayFullnameError && (
              <FormLabel
                label={
                  displayFullnameError ? (formik.errors.fullName as string) : ""
                }
                variant="error"
              />
            )}
          </div>

          <input
            required
            type="text"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`auth__form__input ${
              displayFullnameError && "focus:border-error"
            }`}
          />
        </div>

        {/* Username Input */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <FormLabel htmlFor="username" label="Username" variant="regular" />

            {displayUsernameError && (
              <FormLabel
                label={
                  displayUsernameError ? (formik.errors.username as string) : ""
                }
                variant="error"
              />
            )}
          </div>

          <input
            required
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`auth__form__input ${
              displayUsernameError && "focus:border-error"
            }`}
          />
        </div>

        {/* Email Input */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <FormLabel htmlFor="email" label="Email" variant="regular" />

            {displayEmailError && (
              <FormLabel
                label={displayEmailError ? (formik.errors.email as string) : ""}
                variant="error"
              />
            )}
          </div>

          <input
            required
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`auth__form__input ${
              displayEmailError && "focus:border-error"
            }`}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-max text-text3 bg-primary hover:bg-[#3446E5] active:bg-[#2E3ECC]"
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
    </section>
  );
}

function UpdateProfileImage(): JSX.Element {
  var { user, accessToken } = useUser();
  var [image, setImage] = useState<File | null>(null);
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
        onClick={() => {
          if (loading) return;
          fileInputRef.current.click();
        }}
        className="w-[200px] h-[128px] relative"
      >
        {/* Profile image */}
        <Image
          src={
            (image ? URL.createObjectURL(image) : user.profileImage?.URL) ??
            "https://media.giphy.com/media/9PgvV8ale90lQwfQTZ/giphy-downsized.gif"
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
            onChange={handleFileChange}
            accept="image/x-png,image/gif,image/jpeg"
          />
        </div>
      </div>

      {/* Upload button */}
      <button
        disabled={loading}
        onClick={uploadImage}
        className="px-2 h-9 flex gap-2 items-center rounded-xl text-sm border border-solid border-border"
      >
        <span className="icon">
          <CameraIcon size="size_4" />
        </span>
        <span>{loading ? "Saving..." : "Update photo"}</span>
      </button>
    </section>
  );
}
