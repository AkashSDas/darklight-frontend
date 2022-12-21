import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { ForgotPasswordInput } from "../../lib/auth.lib";
import { forgotPasswordSchema } from "../../lib/yup.lib";
import { forgotPassword } from "../../services/auth.service";
import { RegularButton } from "../button/regular";
import { FormLabel } from "../form/label";

export function ForgotPasswordForm() {
  var [loading, setLoading] = useState(false);

  var formik = useFormik<ForgotPasswordInput>({
    initialValues: { email: "" },
    onSubmit: async function onSubmit(values) {
      setLoading(true);
      var response = await forgotPassword(values);
      setLoading(false);

      if (!response.success) {
        toast.error("Something went wrong, please try again");
      } else {
        formik.resetForm();
        toast.success("Check your email for a password reset link");
      }
    },
    validationSchema: forgotPasswordSchema,
  });

  var displayEmailError = formik.touched.email && formik.errors.email;

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

        <RegularButton variant="contained" type="submit" disabled={loading}>
          {!loading ? "Send instructions" : "...Sending"}
        </RegularButton>
      </form>
    </section>
  );
}
