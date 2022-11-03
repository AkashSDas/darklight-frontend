import { useFormik } from "formik";
import debounce from "lodash.debounce";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { CompleteOAuthPayload, SignupPayload } from "services/_auth";

import Button from "@components/shared/button";
import Navbar from "@components/shared/navbar";
import { useAppDispatch, useAppSelector } from "@hooks/store";
import { completeOAuthSignupSchema, signupSchema } from "@lib/validations";
import Facebook from "@public/brand-svg/facebook.svg";
import Google from "@public/brand-svg/google.svg";
import Twitter from "@public/brand-svg/twitter.svg";
import { selectAuthLoading, selectInitLoading } from "@store/_auth/slice";
import { cancelOAuthThunk, completeOAuthThunk, getLoggedInUserThunk, getNewAccessTokenThunk, signupThunk } from "@store/_auth/thunk";
import { selectUserAvailability, selectUserData } from "@store/_user/slice";
import { userExistsThunk } from "@store/_user/thunk";

// TODO: disable submit button in case of no availability

export default function SignupPage() {
  var dispatch = useAppDispatch();
  var user = useAppSelector(selectUserData);

  return (
    <>
      <Navbar />

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

        {/* Signup */}
        <section className="w-1/2 h-screen flex-grow flex flex-col gap-6 items-center justify-center">
          <h1 className="font-gilroy font-bold text-[31.25px] mb-6">
            {user?.id ? "Last step" : "Create an account"}
          </h1>

          {user?.id && (
            <p className="font-urbanist font-semibold leading-[135%] text-[#686868] px-16 text-center">
              Your account {user.fullName} will be connected to your new
              DarkLight account. Wrong identity?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => dispatch(cancelOAuthThunk())}
              >
                Start over
              </span>
            </p>
          )}

          {user?.id ? <CompleteOAuthSignupForm /> : <SignupWithEmailForm />}

          {!user?.id && (
            <p className="font-urbanist font-semibold leading-[135%] text-[#686868] px-16 text-center">
              OR
            </p>
          )}

          {!user?.id && <SignupOAuthProviders />}

          <p className="font-urbanist font-semibold leading-[135%] text-[#686868] px-16 text-center">
            Already have an account?{" "}
            <Link href="/auth/login">
              <a className="text-blue-500">Login</a>
            </Link>
          </p>
        </section>
      </div>
    </>
  );
}

function SignupOAuthProviders() {
  function oauthSignup(provider: "google" | "twitter" | "facebook") {
    var endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup/${provider}`;
    window.open(endpoint, "_self");
  }

  return (
    <div className="flex gap-3 items-center">
      <button
        onClick={() => oauthSignup("google")}
        className="h-12 px-4 flex gap-2 justify-center items-center text-base  bg-white text-black rounded-2xl border border-solid border-[#E9E9E9]"
      >
        <Google /> <span>Google</span>
      </button>
      <button
        onClick={() => oauthSignup("twitter")}
        className="h-12 px-4 flex gap-2 justify-center items-center text-base  bg-white text-black rounded-2xl border border-solid border-[#E9E9E9]"
      >
        <Twitter /> <span>Twitter</span>
      </button>
      <button
        onClick={() => oauthSignup("facebook")}
        className="h-12 px-4 flex gap-2 justify-center items-center text-base  bg-white text-black rounded-2xl border border-solid border-[#E9E9E9]"
      >
        <Facebook /> <span>Facebook</span>
      </button>
    </div>
  );
}

export function FormLabel(props) {
  return (
    <label
      htmlFor={props.htmlFor}
      className="font-urbanist font-semibold text-sm"
    >
      {props.children}
    </label>
  );
}

export function ValidationMsg(props: {
  loading: boolean;
  valid: boolean;
  children: any;
}) {
  var txtColor = props.loading
    ? "text-gray-500"
    : props.valid
    ? "text-green-500"
    : "text-red-500";

  return (
    <span className={`font-urbanist font-semibold text-sm ${txtColor}`}>
      {props.children}
    </span>
  );
}

function SignupWithEmailForm() {
  var dispatch = useAppDispatch();
  var { email, username } = useAppSelector(selectUserAvailability);
  var loading = useAppSelector(selectAuthLoading);
  var [checkingEmail, setCheckingEmail] = useState(false);
  var [checkingUsername, setCheckingUsername] = useState(false);

  // ===============================================
  // Formik settings
  // ===============================================

  var initialValues: SignupPayload = {
    email: "",
    username: "",
    password: "",
  };

  async function handleSubmit(values: SignupPayload) {
    await dispatch(signupThunk(values));
  }

  var formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: signupSchema,
  });

  var { handleBlur, handleChange, values: formValues } = formik;

  // ===============================================
  // Check username and email availability
  // ===============================================

  // eslint-disable-next-line react-hooks/exhaustive-deps
  var usernameAvailability = useCallback(
    debounce(async function checkAvailability(username: string) {
      if (username.length >= 2 && !formik.errors.username) {
        setCheckingUsername(true);
        await dispatch(userExistsThunk({ field: "username", value: username }));
        setCheckingUsername(false);
      }
    }, 500),
    []
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  var emailAvailability = useCallback(
    debounce(async function checkAvailability(email: string) {
      if (email.length > 0 && !formik.errors.email) {
        setCheckingEmail(true);
        await dispatch(userExistsThunk({ field: "email", value: email }));
        setCheckingEmail(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    usernameAvailability(formik.values.username);
  }, [formik.values.username, usernameAvailability]);

  useEffect(() => {
    emailAvailability(formik.values.email);
  }, [formik.values.email, emailAvailability]);

  // ===============================================
  // JSX
  // ===============================================

  function InputValidationMsg({ name }: { name: string }) {
    var { username: u_error, email: e_error } = formik.errors;
    var { username: u_value, email: e_value } = formik.values;

    if (name == "username" && u_value.length > 0 && !u_error) {
      return (
        <ValidationMsg valid={username} loading={checkingUsername}>
          {checkingUsername
            ? "Checking"
            : username
            ? "Available"
            : "Already used"}
        </ValidationMsg>
      );
    } else if (name == "email" && e_value.length > 0 && !e_error) {
      return (
        <ValidationMsg valid={email} loading={checkingEmail}>
          {checkingEmail ? "Checking" : email ? "Available" : "Already used"}
        </ValidationMsg>
      );
    }

    return (
      <ValidationMsg valid={false} loading={false}>
        {formik.touched[name] && formik.errors[name]}
      </ValidationMsg>
    );
  }

  function Feedback({ name }: { name: string }) {
    var { username: u_error, email: e_error } = formik.errors;
    var { username: u_value, email: e_value } = formik.values;

    if (name == "username" && u_value.length > 0 && !u_error) {
      return (
        <div className="h-6 w-6 flex justify-center items-center rounded-md">
          {checkingUsername ? "⏱️" : username ? "🟢" : "🔴"}
        </div>
      );
    } else if (name == "email" && e_value.length > 0 && !e_error) {
      return (
        <div className="h-6 w-6 flex justify-center items-center rounded-md">
          {checkingEmail ? "⏱️" : email ? "🟢" : "🔴"}
        </div>
      );
    }

    return (
      <div className="h-6 w-6 flex justify-center items-center rounded-md">
        {formik.touched[name] && formik.errors[name] && "🔴"}
      </div>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
      {/* Username */}
      <div className="w-[300px] flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <FormLabel>Username</FormLabel>
          <InputValidationMsg name="username" />
        </div>

        <div className="flex items-center h-12 px-3 rounded-xl border border-solid border-gray-300 font-urbanist text-base">
          <input
            id="username"
            name="username"
            value={formValues.username}
            type="text"
            autoComplete="off"
            onChange={handleChange}
            onBlur={handleBlur}
            className="outline-none flex-grow font-urbanist"
          />

          <Feedback name="username" />
        </div>
      </div>

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
          !formik.values.username ||
          !formik.values.email ||
          !formik.values.password
        }
        label={loading ? "Signing you up" : "Signup with email"}
      />
    </form>
  );
}

function CompleteOAuthSignupForm() {
  var dispatch = useAppDispatch();
  var { email, username } = useAppSelector(selectUserAvailability);
  var user = useAppSelector(selectUserData);
  var loading = useAppSelector(selectAuthLoading);
  var [checkingEmail, setCheckingEmail] = useState(false);
  var [checkingUsername, setCheckingUsername] = useState(false);

  // ===============================================
  // Formik settings
  // ===============================================

  var initialValues: CompleteOAuthPayload = {
    email: user.email || "",
    username: user.username || "",
  };

  async function handleSubmit(values: CompleteOAuthPayload) {
    await dispatch(completeOAuthThunk(values));
  }

  var formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: completeOAuthSignupSchema,
  });

  var { handleBlur, handleChange, values: formValues } = formik;

  // ===============================================
  // Check username and email availability
  // ===============================================

  // eslint-disable-next-line react-hooks/exhaustive-deps
  var usernameAvailability = useCallback(
    debounce(async function checkAvailability(username: string) {
      if (username.length >= 2 && !formik.errors.username) {
        setCheckingUsername(true);
        await dispatch(userExistsThunk({ field: "username", value: username }));
        setCheckingUsername(false);
      }
    }, 500),
    []
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  var emailAvailability = useCallback(
    debounce(async function checkAvailability(email: string) {
      if (email.length > 0 && !formik.errors.email) {
        setCheckingEmail(true);
        await dispatch(userExistsThunk({ field: "email", value: email }));
        setCheckingEmail(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    usernameAvailability(formik.values.username);
  }, [formik.values.username, usernameAvailability]);

  useEffect(() => {
    emailAvailability(formik.values.email);
  }, [formik.values.email, emailAvailability]);

  // ===============================================
  // JSX
  // ===============================================

  function InputValidationMsg({ name }: { name: string }) {
    var { username: u_error, email: e_error } = formik.errors;
    var { username: u_value, email: e_value } = formik.values;

    if (name == "username" && u_value.length > 0 && !u_error) {
      return (
        <ValidationMsg valid={username} loading={checkingUsername}>
          {checkingUsername
            ? "Checking"
            : username
            ? "Available"
            : "Already used"}
        </ValidationMsg>
      );
    } else if (name == "email" && e_value.length > 0 && !e_error) {
      return (
        <ValidationMsg valid={email} loading={checkingEmail}>
          {checkingEmail ? "Checking" : email ? "Available" : "Already used"}
        </ValidationMsg>
      );
    }

    return (
      <ValidationMsg valid={false} loading={false}>
        {formik.touched[name] && formik.errors[name]}
      </ValidationMsg>
    );
  }

  function Feedback({ name }: { name: string }) {
    var { username: u_error, email: e_error } = formik.errors;
    var { username: u_value, email: e_value } = formik.values;

    if (name == "username" && u_value.length > 0 && !u_error) {
      return (
        <div className="h-6 w-6 flex justify-center items-center rounded-md">
          {checkingUsername ? "⏱️" : username ? "🟢" : "🔴"}
        </div>
      );
    } else if (name == "email" && e_value.length > 0 && !e_error) {
      return (
        <div className="h-6 w-6 flex justify-center items-center rounded-md">
          {checkingEmail ? "⏱️" : email ? "🟢" : "🔴"}
        </div>
      );
    }

    return (
      <div className="h-6 w-6 flex justify-center items-center rounded-md">
        {formik.touched[name] && formik.errors[name] ? "🔴" : "🟢"}
      </div>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
      {/* Username */}
      <div className="w-[300px] flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <FormLabel>Username</FormLabel>
          <InputValidationMsg name="username" />
        </div>

        <div className="flex items-center h-12 px-3 rounded-xl border border-solid border-gray-300 font-urbanist text-base">
          <input
            id="username"
            name="username"
            value={formValues.username}
            type="text"
            autoComplete="off"
            onChange={handleChange}
            onBlur={handleBlur}
            className="outline-none flex-grow font-urbanist"
          />

          <Feedback name="username" />
        </div>
      </div>

      {/* Email */}
      <div className="w-[300px] flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <FormLabel>Email</FormLabel>
          {!user?.email && <InputValidationMsg name="email" />}
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
            disabled={user?.email ? true : false}
            className="outline-none flex-grow font-urbanist disabled:text-gray-500"
          />

          {!user?.email && <Feedback name="email" />}
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
          !formik.values.username ||
          !formik.values.email
        }
        label={loading ? "Signing you up" : "Complete your signup"}
      />
    </form>
  );
}

// SignupPage.getLayout = getAuthLayout;
