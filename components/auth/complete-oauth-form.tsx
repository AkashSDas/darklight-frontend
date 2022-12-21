import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { completeOAuth } from "services/auth.service";

import { FormLabel } from "@components/form/label";
import { CompleteOAuthInput } from "@lib/auth.lib";
import { useUser } from "@lib/hooks.lib";
import { completeOAuthSchema } from "@lib/yup.lib";

// TODO: add debounce check for available username and email
export default function CompleteOAuthForm(): JSX.Element {
  var router = useRouter();
  var { user, mutateUser } = useUser();
  var [loading, setLoading] = useState(false);

  var formik = useFormik<CompleteOAuthInput>({
    initialValues: { username: user.username ?? "", email: user.email ?? "" },
    onSubmit: handleSubmit,
    validationSchema: completeOAuthSchema,
  });

  var displayUsernameError = formik.touched.username && formik.errors.username;
  var displayEmailError = formik.touched.email && formik.errors.email;

  async function handleSubmit(values: CompleteOAuthInput) {
    setLoading(true);
    var response = await completeOAuth(values);
    setLoading(false);

    if (!response.success) toast.error(response.error.message);
    else {
      formik.resetForm();
      toast.success("Signup completed");
      await mutateUser();
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

        {/* Submit Button */}
        <button
          type="submit"
          className="text-text3 bg-primary hover:bg-[#3446E5] active:bg-[#2E3ECC]"
          disabled={loading}
        >
          {loading ? "Loading..." : "Complete your signup"}
        </button>
      </form>
    </section>
  );
}
