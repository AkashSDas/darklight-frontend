import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { CompleteOAuthInput } from "../../lib/auth.lib";
import { useAppDispatch, useUser } from "../../lib/hooks.lib";
import { normalizeJsonToUser } from "../../lib/user.lib";
import { completeOAuthSchema } from "../../lib/yup.lib";
import { completeOAuth } from "../../services/auth.service";
import { setDetails } from "../../store/user/slice";
import { RegularButton } from "../button/regular";
import { FormLabel } from "../form/label";

export function CompleteOAuthForm() {
  var [loading, setLoading] = useState(false);
  var dispatch = useAppDispatch();
  var router = useRouter();
  var { user } = useUser();

  var formik = useFormik<CompleteOAuthInput>({
    initialValues: { username: user.username ?? "", email: user.email },
    onSubmit: async function onSubmit(values) {
      setLoading(true);
      var response = await completeOAuth(values);
      setLoading(false);

      if (!response.success) toast.error("Failed to signup, please try again");
      else {
        formik.resetForm();
        toast.success("Signup completed");
        dispatch(setDetails(normalizeJsonToUser(response.user)));
        router.push("/");
      }
    },
    validationSchema: completeOAuthSchema,
  });

  var displayUsernameError = formik.touched.username && formik.errors.username;
  var displayEmailError = formik.touched.email && formik.errors.email;

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

        <RegularButton variant="contained" type="submit" disabled={loading}>
          {!loading ? "Complete your signup" : "...Saving"}
        </RegularButton>
      </form>
    </section>
  );
}
