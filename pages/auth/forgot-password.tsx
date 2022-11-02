import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";

import Button from "@components/shared/button";
import { useAppDispatch, useAppSelector } from "@hooks/store";
import { forgotPasswordSchema } from "@lib/validations";
import { selectAuthLoading } from "@store/_auth/slice";
import { forgotPasswordThunk } from "@store/_auth/thunk";

import { FormLabel, ValidationMsg } from "./signup";

export default function ForgotPasswordPage() {
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

      {/* Forgot password */}
      <section className="w-1/2 h-screen flex-grow flex flex-col gap-6 items-center justify-center">
        <h1 className="font-gilroy font-bold text-[31.25px] mb-6">
          Reset your password
        </h1>

        <p className="font-urbanist font-semibold leading-[135%] text-[#686868] px-16 text-center">
          Enter the email address you used when you joined and {"we'll"} send
          you instructions to reset your password
        </p>

        <ForgotPasswordForm />

        <p className="font-urbanist font-semibold leading-[135%] text-[#686868] px-16 text-center">
          Remembered your password?{" "}
          <Link href="/auth/login">
            <a className="text-blue-500">Login</a>
          </Link>
        </p>
      </section>
    </div>
  );
}

function ForgotPasswordForm() {
  var dispatch = useAppDispatch();
  var loading = useAppSelector(selectAuthLoading);

  // ===============================================
  // Formik settings
  // ===============================================

  var initialValues = { email: "" };

  async function handleSubmit(values: typeof initialValues) {
    await dispatch(forgotPasswordThunk(values.email));
  }

  var formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: forgotPasswordSchema,
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
      {/* Email */}
      <div className="w-[300px] flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <FormLabel>Email</FormLabel>
          <InputValidationMsg name="email" />
        </div>

        <div className="flex items-center h-12 px-3 rounded-xl border border-solid border-gray-300 font-urbanist text-base">
          <input
            id="email"
            name="email"
            value={formValues.email}
            type="email"
            autoComplete="off"
            onChange={handleChange}
            onBlur={handleBlur}
            className="outline-none flex-grow font-urbanist"
          />

          <Feedback name="email" />
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
          !formik.values.email
        }
        label={loading ? "Sending instructions" : "Send instructions"}
      />
    </form>
  );
}
