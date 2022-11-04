import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { PasswordResetPayload } from "services/_auth";

import Button from "@components/shared/button";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { forgotPasswordSchema, passwordResetSchema } from "@lib/validations";
import { selectAuthLoading } from "@store/_auth/slice";
import { forgotPasswordThunk, passwordResetThunk } from "@store/_auth/thunk";

import { FormLabel, ValidationMsg } from "./signup";

export default function PasswordResetPage() {
  return (
    <div className="relative px-6 flex gap-6 items-center">
      {/* Gif */}
      <aside className="sticky w-1/2 h-screen flex-grow flex flex-col items-center justify-center">
        <div className="w-[500px] h-[385px]">
          <Image
            src="/gifs/sit.gif"
            width={500}
            height={385}
            layout="fixed"
            alt="Gif"
            className="rounded-[100px]"
          />
        </div>
      </aside>

      {/* Reset password */}
      <section className="w-1/2 h-screen flex-grow flex flex-col gap-6 items-center justify-center">
        <h1 className="font-gilroy font-bold text-[31.25px] mb-6">
          Reset your password
        </h1>

        <p className="font-urbanist font-semibold leading-[135%] text-[#686868] px-16 text-center">
          Enter your new password and complete the reset password process
        </p>

        <PasswordResetorm />

        <p className="font-urbanist font-semibold leading-[135%] text-[#686868] px-16 text-center">
          Get back to your account?{" "}
          <Link href="/auth/login">
            <a className="text-blue-500">Login</a>
          </Link>
        </p>
      </section>
    </div>
  );
}

function PasswordResetorm() {
  var router = useRouter();
  var dispatch = useAppDispatch();
  var loading = useAppSelector(selectAuthLoading);

  // ===============================================
  // Formik settings
  // ===============================================

  var initialValues = { password: "", confirmPassword: "" };

  async function handleSubmit(values: typeof initialValues) {
    if (router.query?.token) {
      await dispatch(
        passwordResetThunk({ ...values, token: router.query.token as string })
      );
    }
  }

  var formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: passwordResetSchema,
  });

  var { handleBlur, handleChange, values: formValues } = formik;

  // ===============================================
  // JSX
  // ===============================================

  function InputValidationMsg({ name }: { name: string }) {
    return (
      <ValidationMsg valid={false} loading={false}>
        {formik.touched[name] && formik.errors[name]}
      </ValidationMsg>
    );
  }

  function Feedback({ name }: { name: string }) {
    return (
      <div className="h-6 w-6 flex justify-center items-center rounded-md">
        {formik.touched[name] && formik.errors[name] && "🔴"}
      </div>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
      {/* Password */}
      <div className="w-[300px] flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <FormLabel>Password</FormLabel>
          <InputValidationMsg name="password" />
        </div>

        <div className="flex items-center h-12 px-3 rounded-xl border border-solid border-gray-300 font-urbanist text-base">
          <input
            id="password"
            name="password"
            value={formValues.password}
            type="password"
            autoComplete="off"
            onChange={handleChange}
            onBlur={handleBlur}
            className="outline-none flex-grow font-mono"
          />

          <Feedback name="password" />
        </div>
      </div>

      {/* Confirm Password */}
      <div className="w-[300px] flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <FormLabel>Confirm password</FormLabel>
          <InputValidationMsg name="confirmPassword" />
        </div>

        <div className="flex items-center h-12 px-3 rounded-xl border border-solid border-gray-300 font-urbanist text-base">
          <input
            id="confirmPassword"
            name="confirmPassword"
            value={formValues.confirmPassword}
            type="password"
            autoComplete="off"
            onChange={handleChange}
            onBlur={handleBlur}
            className="outline-none flex-grow font-mono"
          />

          <Feedback name="confirmPassword" />
        </div>
      </div>

      <Button
        variant="contained"
        size="lg"
        type="submit"
        onClick={formik.handleSubmit as any}
        disabled={
          formik.isSubmitting ||
          !formik.isValid ||
          !formik.dirty ||
          !formik.values.password ||
          !formik.values.confirmPassword
        }
        label={loading ? "Updating your password" : "Reset password"}
      />
    </form>
  );
}
