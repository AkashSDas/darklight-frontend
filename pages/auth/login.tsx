import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { LoginPayload } from "services/_auth";

import Button from "@components/shared/button";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { loginSchema } from "@lib/validations";
import Facebook from "@public/brand-svg/facebook.svg";
import Google from "@public/brand-svg/google.svg";
import Twitter from "@public/brand-svg/twitter.svg";
import { selectAuthLoading } from "@store/_auth/slice";
import { loginThunk } from "@store/_auth/thunk";

import { FormLabel, ValidationMsg } from "./signup";

function useInvalidLogin() {
  var router = useRouter();

  useEffect(() => {
    if (router.query.info == "signup-invalid") {
      toast.error("No OR incomplete account");
    }
  }, [router.query]);
}

export default function LoginPage() {
  useInvalidLogin();

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

      {/* Login */}
      <section className="w-1/2 h-screen flex-grow flex flex-col gap-6 items-center justify-center">
        <h1 className="font-gilroy font-bold text-[31.25px] mb-6">
          Welcome back
        </h1>

        <LoginWithEmailForm />

        <p className="font-urbanist font-semibold leading-[135%] text-[#686868] px-16 text-center">
          <Link href="/auth/forgot-password">
            <a className="text-blue-500">Forgot password</a>
          </Link>
        </p>

        <p className="font-urbanist font-semibold leading-[135%] text-[#686868] px-16 text-center">
          OR
        </p>

        <LoginOAuthProviders />

        <p className="font-urbanist font-semibold leading-[135%] text-[#686868] px-16 text-center">
          {"Don't"} have an account?{" "}
          <Link href="/auth/signup">
            <a className="text-blue-500">Signup</a>
          </Link>
        </p>
      </section>
    </div>
  );
}

function LoginWithEmailForm() {
  var dispatch = useAppDispatch();
  var loading = useAppSelector(selectAuthLoading);

  // ===============================================
  // Formik settings
  // ===============================================

  var initialValues: LoginPayload = {
    email: "",
    password: "",
  };

  async function handleSubmit(values: LoginPayload) {
    await dispatch(loginThunk(values));
  }

  var formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: loginSchema,
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

      <Button
        variant="contained"
        size="lg"
        type="submit"
        onClick={formik.handleSubmit as any}
        disabled={
          formik.isSubmitting ||
          !formik.isValid ||
          !formik.dirty ||
          !formik.values.email ||
          !formik.values.password
        }
        label={loading ? "Logging you in" : "Login with email"}
      />
    </form>
  );
}

function LoginOAuthProviders() {
  function oauthLogin(provider: "google" | "twitter" | "facebook") {
    var endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login/${provider}`;
    window.open(endpoint, "_self");
  }

  return (
    <div className="flex gap-3 items-center">
      <button
        onClick={() => oauthLogin("google")}
        className="h-12 px-4 flex gap-2 justify-center items-center text-base  bg-white text-black rounded-2xl border border-solid border-[#E9E9E9]"
      >
        <Google /> <span>Google</span>
      </button>
      <button
        onClick={() => oauthLogin("twitter")}
        className="h-12 px-4 flex gap-2 justify-center items-center text-base  bg-white text-black rounded-2xl border border-solid border-[#E9E9E9]"
      >
        <Twitter /> <span>Twitter</span>
      </button>
      <button
        onClick={() => oauthLogin("facebook")}
        className="h-12 px-4 flex gap-2 justify-center items-center text-base  bg-white text-black rounded-2xl border border-solid border-[#E9E9E9]"
      >
        <Facebook /> <span>Facebook</span>
      </button>
    </div>
  );
}
