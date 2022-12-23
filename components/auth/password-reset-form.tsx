import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { passwordResetPassword } from "services/auth.service";

import { FormLabel } from "@components/shared/form-label";
import { PasswordResetInput } from "@lib/auth.lib";
import { passwordResetSchema } from "@lib/yup.lib";

export default function PasswordResetForm(): JSX.Element {
  var router = useRouter();
  var resetPasswordToken = router.query.token as string;
  var [loading, setLoading] = useState(false);

  var formik = useFormik<PasswordResetInput>({
    initialValues: { password: "", confirmPassword: "" },
    onSubmit: handleSubmit,
    validationSchema: passwordResetSchema,
  });

  var displayPasswordError = formik.touched.password && formik.errors.password;
  var displayConfirmPasswordError =
    formik.touched.confirmPassword && formik.errors.confirmPassword;

  async function handleSubmit(values: PasswordResetInput) {
    if (!resetPasswordToken) return;

    setLoading(true);
    var response = await passwordResetPassword(values, resetPasswordToken);
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

        {/* Confirm Password Input */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <FormLabel
              htmlFor="confirmPassword"
              label="Confirm Password"
              variant="regular"
            />

            {displayConfirmPasswordError && (
              <FormLabel
                label={
                  displayConfirmPasswordError
                    ? (formik.errors.confirmPassword as string)
                    : ""
                }
                variant="error"
              />
            )}
          </div>

          <input
            required
            type="password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`auth__form__input ${
              displayConfirmPasswordError && "focus:border-error"
            }`}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="text-text3 bg-primary hover:bg-[#3446E5] active:bg-[#2E3ECC]"
          disabled={loading}
        >
          {loading ? "Loading..." : "Reset Password"}
        </button>
      </form>
    </section>
  );
}
