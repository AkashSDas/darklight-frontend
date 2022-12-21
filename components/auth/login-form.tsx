import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { login } from "services/auth.service";
import { useSWRConfig } from "swr";

import { FormLabel } from "@components/form/label";
import { LoginInput } from "@lib/auth.lib";
import { loginSchema } from "@lib/yup.lib";

export default function LoginForm(): JSX.Element {
  var router = useRouter();
  var { mutate } = useSWRConfig();
  var [loading, setLoading] = useState(false);

  var formik = useFormik<LoginInput>({
    initialValues: { email: "", password: "" },
    onSubmit: handleSubmit,
    validationSchema: loginSchema,
  });

  var displayEmailError = formik.touched.email && formik.errors.email;
  var displayPasswordError = formik.touched.password && formik.errors.password;

  async function handleSubmit(values: LoginInput) {
    setLoading(true);
    var response = await login(values);
    setLoading(false);

    if (!response.success) toast.error("Failed to login");
    else {
      formik.resetForm();
      toast.success("Logged in successfully");

      let { accessToken, user, success } = response;
      if (accessToken) {
        await mutate(
          "new-access-token",
          { success, accessToken, user },
          { revalidate: false }
        );
      } else if (user) {
        await mutate(
          "user",
          { success, user, error: null },
          { revalidate: false }
        );
      }

      router.push("/");
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

        {/* Password Input */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <FormLabel htmlFor="password" label="Password" variant="regular" />

            <Link href="/auth/forgot-password" className="text-link text-sm">
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

        {/* Submit Button */}
        <button
          type="submit"
          className="text-text3 bg-primary hover:bg-[#3446E5] active:bg-[#2E3ECC]"
          disabled={loading}
        >
          {loading ? "Loading..." : "Login with email"}
        </button>
      </form>
    </section>
  );
}
