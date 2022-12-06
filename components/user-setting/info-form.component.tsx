import { useFormik } from "formik";
import Image from "next/image";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

import { useUser } from "../../lib/hooks.lib";
import { updateProfileImage } from "../../services/user.service";
import { RegularButton } from "../button";
import { FormLabel } from "../form";
import { CameraIcon } from "../icons";

export function InfoForm() {
  return (
    <div className="flex justify-center gap-16 w-full">
      <ProfileImageForm />
      <DetailsForm />
    </div>
  );
}

function DetailsForm() {
  var [loading, setLoading] = useState(false);
  var { user } = useUser();

  var formik = useFormik({
    initialValues: {
      fullName: user.fullName ?? "",
      username: user.username,
      email: user.email,
    },
    onSubmit: async function onSubmit(values) {},
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

        <div>
          <RegularButton variant="contained" type="submit" disabled={loading}>
            {!loading ? "Save" : "...Saving"}
          </RegularButton>
        </div>
      </form>
    </section>
  );
}

function ProfileImageForm() {
  var [loading, setLoading] = useState(false);
  var [profileImage, setProfileImage] = useState();
  var ref = useRef<any>();
  var { user, accessToken } = useUser();

  function updateFile(e: any) {
    var file = e.target.files[0];
    setProfileImage(file);
  }

  async function uploadImage() {
    if (!profileImage) return;
    setLoading(true);

    var formData = new FormData();
    formData.append("profileImage", profileImage);
    var { success } = await updateProfileImage(accessToken, formData);
    if (success) toast.success("Profile image update");
    else toast.error("Failed to update profile image");
    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-2 items-center">
      <div
        onClick={() => {
          if (loading) return;
          ref.current.click();
        }}
        className="w-[200px] h-[128px] relative"
      >
        <Image
          src={
            user.profileImage?.URL ??
            (profileImage
              ? URL.createObjectURL(profileImage)
              : "https://media.giphy.com/media/9PgvV8ale90lQwfQTZ/giphy-downsized.gif")
          }
          alt="User avatar"
          fill
          className="object-cover rounded-[41px]"
        />

        <div className="bg-black opacity-40 cursor-pointer rounded-[41px] flex justify-center items-center w-full h-full absolute top-0 left-0">
          <span className="text-text3">{loading ? "Editing" : "Edit"}</span>
          <input
            ref={ref}
            hidden
            type="file"
            onChange={updateFile}
            accept="image/x-png,image/gif,image/jpeg"
          />
        </div>
      </div>

      <button
        disabled={loading}
        onClick={uploadImage}
        className="h-9 px-2 rounded-xl border border-solid border-border flex gap-2 items-center"
      >
        <CameraIcon size="18" />
        <span className="text-text2">
          {loading ? "...Uploading" : "Update photo"}
        </span>
      </button>
    </div>
  );
}
