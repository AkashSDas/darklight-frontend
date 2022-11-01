import { useFormik } from "formik";
import debounce from "lodash.debounce";
import Image from "next/image";
import { ReactElement, useCallback, useEffect } from "react";
import { SignupPayload } from "services/_auth";

import AuthLayout, { getAuthLayout } from "@components/shared/auth-layout";
import Button from "@components/shared/button";
import { useAppDispatch, useAppSelector } from "@hooks/store";
import { signupSchema } from "@lib/validations";
import Facebook from "@public/brand-svg/facebook.svg";
import Google from "@public/brand-svg/google.svg";
import Twitter from "@public/brand-svg/twitter.svg";
import { selectAuthLoading } from "@store/_auth/slice";
import { signupThunk } from "@store/_auth/thunk";
import { emailAvailabilityCheckThunk, usernameAvailabilityCheckThunk } from "@store/user/thunk";

export default function SignupPage() {
  var dispatch = useAppDispatch();
  var user = useAppSelector((state) => state.user.data);
  var loggedIn = user?.id;

  return (
    <section className="flex flex-col gap-6 items-center">
      <h1 className="font-gilroy font-bold text-5xl text-center mt-6">
        {!loggedIn ? "✌🏼 Create an account" : "Last step"}
      </h1>
      {loggedIn && (
        <p className="font-urbanist font-semibold leading-[135%] text-[#686868] px-16 text-center">
          Your account {user?.fullName} will be connected to your new DarkLight
          account. Wrong identity?{" "}
          <span className="text-blue-600">Start over</span>
        </p>
      )}
      {!loggedIn && <OAuthProviders />}
      {!loggedIn && (
        <div className="font-urbanist font-medium text-[#686868]">OR</div>
      )}

      <SignupWithEmailForm />
    </section>
  );
}

function SignupWithEmailForm() {
  var dispatch = useAppDispatch();
  var loading = useAppSelector(selectAuthLoading);
  var {
    checkingEmailAvailable,
    checkingUsernameAvailable,
    isEmailAvailable,
    isUsernameAvailable,
  } = useAppSelector((state) => state.user);

  // ===============================================
  // Formik settings
  // ===============================================

  var initialValues: SignupPayload = {
    username: "",
    email: "",
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
  var checkUsernameAvailability = useCallback(
    debounce(async function checkAvailability(username: string) {
      if (username.length >= 2 && !formik.errors.username) {
        await dispatch(usernameAvailabilityCheckThunk(username));
      }
    }, 500),
    []
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  var checkEmailAvailability = useCallback(
    debounce(async function checkAvailability(email: string) {
      if (email.length > 0 && !formik.errors.email) {
        await dispatch(emailAvailabilityCheckThunk(email));
      }
    }, 500),
    []
  );

  useEffect(() => {
    checkUsernameAvailability(formik.values.username);
  }, [formik.values.username, checkUsernameAvailability]);

  useEffect(() => {
    checkEmailAvailability(formik.values.email);
  }, [formik.values.email, checkEmailAvailability]);

  // ===============================================
  // JSX
  // ===============================================

  function InputGroup({ children }) {
    return <div className="w-[300px] flex flex-col gap-1">{children}</div>;
  }

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
      <div className="w-[300px] flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <FormLabel>Username</FormLabel>
          {formik.values.username.length > 0 && !formik.errors.username && (
            <ValidationMsg
              valid={isUsernameAvailable}
              loading={checkingUsernameAvailable}
            >
              {checkingUsernameAvailable
                ? "Checking"
                : isUsernameAvailable
                ? "Available"
                : "Already used"}
            </ValidationMsg>
          )}
        </div>

        <div className="flex items-center h-11 px-3 rounded-xl border border-solid border-gray-300 font-urbanist text-base">
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

          <div className="h-6 w-6 flex justify-center items-center rounded-md">
            {checkingUsernameAvailable
              ? "⏳"
              : isUsernameAvailable
              ? "✅"
              : "❌"}
          </div>
        </div>
      </div>

      <div className="w-[300px] flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <FormLabel>Email</FormLabel>
          {formik.values.email.length > 0 && !formik.errors.email && (
            <ValidationMsg
              valid={isEmailAvailable}
              loading={checkingEmailAvailable}
            >
              {checkingEmailAvailable
                ? "Checking"
                : isEmailAvailable
                ? "Available"
                : "Already used"}
            </ValidationMsg>
          )}
        </div>

        <div className="flex items-center h-11 px-3 rounded-xl border border-solid border-gray-300 font-urbanist text-base">
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

          <div className="h-6 w-6 flex justify-center items-center rounded-md">
            {checkingEmailAvailable ? "⏳" : isEmailAvailable ? "✅" : "❌"}
          </div>
        </div>
      </div>
    </form>
  );
}

function ValidationMsg(props) {
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

function FormLabel(props) {
  return (
    <label
      htmlFor={props.htmlFor}
      className="font-urbanist font-semibold text-sm"
    >
      {props.children}
    </label>
  );
}

function OAuthProviders() {
  function signup(provider: "google" | "twitter" | "facebook") {
    var endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup/${provider}`;
    window.open(endpoint, "_self");
  }

  var btnStyle =
    "h-11 rounded-2xl px-6 flex justify-center items-center gap-2 bg-white text-black border border-solid border-[#E9E9E9]";

  return (
    <div className="flex items-center gap-6">
      <button onClick={() => signup("google")} className={btnStyle}>
        <Google />
      </button>
      <button onClick={() => signup("facebook")} className={btnStyle}>
        <Facebook />
      </button>
      <button onClick={() => signup("twitter")} className={btnStyle}>
        <Twitter />
      </button>
    </div>
  );
}

SignupPage.getLayout = getAuthLayout;
