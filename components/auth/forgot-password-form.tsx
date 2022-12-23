import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { forgotPassword } from "services/auth.service";

import { FormLabel } from "@components/shared/form-label";
import { ForgotPasswordInput } from "@lib/auth.lib";
import { forgotPasswordSchema } from "@lib/yup.lib";

export default function ForgotPasswordForm(): JSX.Element {
  var [loading, setLoading] = useState(false);

  var formik = useFormik<ForgotPasswordInput>({
    initialValues: { email: "" },
    onSubmit: handleSubmit,
    validationSchema: forgotPasswordSchema,
  });

  var displayEmailError = formik.touched.email && formik.errors.email;

  async function handleSubmit(values: ForgotPasswordInput) {
    setLoading(true);
    var response = await forgotPassword(values);
    setLoading(false);

    if (!response.success) {
      toast.error("Something went wrong, please try again");
    } else {
      formik.resetForm();
      toast.success("Check your email for a password reset link");
    }
  }

  return (
    <section className="w-full max-w-[360px]">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-[18px]">
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
          {loading ? "Loading..." : "Send Reset Link"}
        </button>
      </form>
    </section>
  );
}
