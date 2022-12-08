import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { SignupInput } from "../../lib/auth.lib";
import { useAppDispatch } from "../../lib/hooks.lib";
import { normalizeJsonToUser } from "../../lib/user.lib";
import { signupSchema } from "../../lib/yup.lib";
import { signup } from "../../services/auth.service";
import { setAccessToken, setDetails } from "../../store/user/slice";
import { RegularButton } from "../button/regular";
import { FormLabel } from "../form/label";

export function SignupForm() {
  var [loading, setLoading] = useState(false);
  var dispatch = useAppDispatch();
  var router = useRouter();

  var formik = useFormik<SignupInput>({
    initialValues: { username: "", email: "", password: "" },
    onSubmit: async function onSubmit(values) {
      setLoading(true);
      var response = await signup(values);
      setLoading(false);

      if (!response.success) toast.error("Failed to signup, please try again");
      else {
        formik.resetForm();
        toast.success(response.message);
        dispatch(setAccessToken(response.accessToken));
        dispatch(setDetails(normalizeJsonToUser(response.user)));
        router.push("/");
      }
    },
    validationSchema: signupSchema,
  });

  var displayUsernameError = formik.touched.username && formik.errors.username;
  var displayEmailError = formik.touched.email && formik.errors.email;
  var displayPasswordError = formik.touched.password && formik.errors.password;

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

        <RegularButton variant="contained" type="submit" disabled={loading}>
          {!loading ? "Signup with email" : "...Signing up"}
        </RegularButton>
      </form>
    </section>
  );
}
