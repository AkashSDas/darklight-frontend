import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { ForgotPasswordInput, PasswordResetInput } from "../../lib/auth.lib";
import { forgotPasswordSchema, passwordResetSchema } from "../../lib/yup.lib";
import { forgotPassword, passwordResetPassword } from "../../services/auth.service";
import { RegularButton } from "../button";
import { FormLabel } from "../form";

export function PasswordResetForm() {
  var [loading, setLoading] = useState(false);
  var router = useRouter();

  var formik = useFormik<PasswordResetInput>({
    initialValues: { password: "", confirmPassword: "" },
    onSubmit: async function onSubmit(values) {
      setLoading(true);
      if (router.query.token) {
        let response = await passwordResetPassword(
          values,
          router.query.token as string
        );

        if (!response.success) {
          toast.error("Something went wrong, please try again");
        } else {
          formik.resetForm();
          toast.success("Check your email for a password reset link");
        }
      }
      setLoading(false);
    },
    validationSchema: passwordResetSchema,
  });

  var displayPasswordError = formik.touched.password && formik.errors.password;
  var displayConfirmPasswordError =
    formik.touched.confirmPassword && formik.errors.confirmPassword;

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
              label="Confirm password"
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
              displayPasswordError && "focus:border-error"
            }`}
          />
        </div>

        <RegularButton variant="contained" type="submit" disabled={loading}>
          {!loading ? "Reset password" : "...Updating"}
        </RegularButton>
      </form>
    </section>
  );
}
