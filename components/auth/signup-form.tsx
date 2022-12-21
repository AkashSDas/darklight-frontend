import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { signup } from "services/auth.service";
import { useSWRConfig } from "swr";

import { FormLabel } from "@components/form/label";
import { SignupInput } from "@lib/auth.lib";
import { signupSchema } from "@lib/yup.lib";

// TODO: add debounce check for available username and email
export default function SignupForm(): JSX.Element {
  var router = useRouter();
  var { mutate } = useSWRConfig();
  var [loading, setLoading] = useState(false);

  var formik = useFormik<SignupInput>({
    initialValues: { username: "", email: "", password: "" },
    onSubmit: handleSubmit,
    validationSchema: signupSchema,
  });

  var displayUsernameError = formik.touched.username && formik.errors.username;
  var displayEmailError = formik.touched.email && formik.errors.email;
  var displayPasswordError = formik.touched.password && formik.errors.password;

  async function handleSubmit(values: SignupInput) {
    setLoading(true);
    var response = await signup(values);
    setLoading(false);

    if (!response.success) toast.error(response.error.message);
    else {
      formik.resetForm();
      toast.success(response.message);

      let { accessToken, user, success } = response;
      await mutate(
        "new-access-token",
        { success, accessToken, user },
        { revalidate: false }
      );

      router.push("/");
    }
  }

  return (
    <section className="w-full max-w-[360px]">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-[18px]">
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

        {/* Password Input */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <FormLabel htmlFor="password" label="Password" variant="regular" />

            {displayPasswordError && (
              <FormLabel
                label={
                  displayPasswordError ? (formik.errors.password as string) : ""
                }
                variant="error"
              />
            )}
          </div>

          <input
            required
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`auth__form__input ${
              displayPasswordError && "focus:border-error"
            }`}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="text-text3 bg-primary hover:bg-[#3446E5] active:bg-[#2E3ECC]"
          disabled={loading}
        >
          {loading ? "Loading..." : "Signup with email"}
        </button>
      </form>
    </section>
  );
}
