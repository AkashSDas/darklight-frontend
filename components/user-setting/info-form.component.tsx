import { useFormik } from "formik";
import Image from "next/image";
import { useState } from "react";

import { useUser } from "../../lib/hooks.lib";
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

function ProfileImageForm({ URL }: { URL?: string }) {
  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="w-[200px] h-[128px] relative">
        <Image
          src={
            URL ??
            "https://media.giphy.com/media/9PgvV8ale90lQwfQTZ/giphy-downsized.gif"
          }
          alt="User avatar"
          fill
          className="object-cover rounded-[41px]"
        />
      </div>

      <button className="h-9 px-2 rounded-xl border border-solid border-border flex gap-2 items-center">
        <CameraIcon size="18" />
        <span className="text-text2">Update photo</span>
      </button>
    </div>
  );
}
