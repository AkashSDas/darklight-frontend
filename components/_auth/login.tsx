import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useSWRConfig } from "swr";

import { LoginInput } from "../../lib/auth.lib";
import { loginSchema } from "../../lib/yup.lib";
import { login } from "../../services/auth.service";
import { RegularButton } from "../button/regular";
import { FormLabel } from "../form/label";

export function LoginForm() {
  var [loading, setLoading] = useState(false);
  var { mutate } = useSWRConfig();
  var router = useRouter();

  var formik = useFormik<LoginInput>({
    initialValues: { email: "", password: "" },
    onSubmit: async function onSubmit(values) {
      setLoading(true);
      var response = await login(values);
      setLoading(false);

      if (!response.success) toast.error("Failed to login, please try again");
      else {
        formik.resetForm();
        toast.success(response.message);

        let { accessToken, user, success } = response;
        await mutate("access-token", { success, accessToken });
        await mutate("user", { success, user, error: null });
        router.push("/");
      }
    },
    validationSchema: loginSchema,
  });

  var displayEmailError = formik.touched.email && formik.errors.email;
  var displayPasswordError = formik.touched.password && formik.errors.password;

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

        {/* Password Input */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <FormLabel htmlFor="password" label="Password" variant="regular" />

            <Link
              href="/auth/forgot-password"
              className="text-link text-sm font-normal font-urbanist"
            >
              Forgot password
            </Link>
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
          {!loading ? "Login with email" : "...Logging in"}
        </RegularButton>
      </form>
    </section>
  );
}
