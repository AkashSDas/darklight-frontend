import { useFormik } from "formik";
import debounce from "lodash.debounce";
import { useCallback, useEffect } from "react";
import { ISignupPayload } from "services/auth";

import FlatButton from "@components/buttons/flat-button";
import FormLabel from "@components/form/label";
import { useAppDispatch, useAppSelector } from "@hooks/store";
import { signupValidation } from "@lib/validations";
import { signupThunk } from "@store/auth/thunk";
import { emailAvailabilityCheckThunk, usernameAvailabilityCheckThunk } from "@store/user/thunk";
import styles from "@styles/components/signup/basic.module.scss";

function BasicSignup() {
  var dispatch = useAppDispatch();
  var { signupLoading } = useAppSelector((state) => state.auth);
  var {
    checkingEmailAvailable,
    checkingUsernameAvailable,
    isEmailAvailable,
    isUsernameAvailable,
  } = useAppSelector((state) => state.user);

  // ===============================================
  // Formik settings
  // ===============================================

  var initialValues: ISignupPayload = {
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  async function handleSubmit(values: ISignupPayload) {
    await dispatch(signupThunk(values));
  }

  var formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: signupValidation,
  });

  var { handleBlur, handleChange, values: formValues } = formik;

  // ===============================================
  // Check username and email availability
  // ===============================================

  var checkUsernameAvailability = useCallback(
    debounce(async function checkAvailability(username: string) {
      if (username.length >= 2 && !formik.errors.username) {
        await dispatch(usernameAvailabilityCheckThunk(username));
      }
    }, 500),
    []
  );

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

  function UsernameAvailabilityMsg() {
    if (checkingUsernameAvailable) {
      return (
        <span className={`${styles.info_msg} -text-cap`}>Checking...</span>
      );
    } else if (isUsernameAvailable) {
      return (
        <span className={`${styles.success_msg} -text-cap`}>Available</span>
      );
    }
    return (
      <span className={`${styles.error_msg} -text-cap`}>Already used</span>
    );
  }

  function EmailAvailabilityMsg() {
    if (checkingEmailAvailable) {
      return (
        <span className={`${styles.info_msg} -text-cap`}>Checking...</span>
      );
    } else if (isEmailAvailable) {
      return (
        <span className={`${styles.success_msg} -text-cap`}>Available</span>
      );
    }
    return (
      <span className={`${styles.error_msg} -text-cap`}>Already used</span>
    );
  }

  function InputValidationMsg({ name }: { name: string }) {
    var { username: u_error, email: e_error } = formik.errors;
    var { username: u_value, email: e_value } = formik.values;

    if (name == "username" && u_value.length > 0 && !u_error) {
      return <UsernameAvailabilityMsg />;
    } else if (name == "email" && e_value.length > 0 && !e_error) {
      return <EmailAvailabilityMsg />;
    }

    return (
      <span className={`${styles.error_msg} -text-cap`}>
        {formik.touched[name] && formik.errors[name]}
      </span>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit} className={styles.container}>
      {/* ================= Fullname and username ================= */}
      <div className={styles.inline_group}>
        <div className={styles.input_group}>
          <FormLabel label="Fullname" htmlFor="fullName" />
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="off"
            value={formValues.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <InputValidationMsg name="fullName" />
        </div>

        <div className={styles.input_group}>
          <FormLabel label="Username" htmlFor="username" />
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="off"
            value={formValues.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <InputValidationMsg name="username" />
        </div>
      </div>

      {/* ================= Email ================= */}
      <div className={styles.input_group}>
        <FormLabel label="Email" htmlFor="email" />
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="off"
          value={formValues.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <InputValidationMsg name="email" />
      </div>

      {/* ================= Password and confirm password ================= */}
      <div className={styles.inline_group}>
        <div className={styles.input_group}>
          <FormLabel label="Password" htmlFor="password" />
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Minimum 6 characters"
            autoComplete="off"
            value={formValues.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <InputValidationMsg name="password" />
        </div>

        <div className={styles.input_group}>
          <FormLabel label="Confirm Password" htmlFor="confirmPassword" />
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="off"
            value={formValues.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <InputValidationMsg name="confirmPassword" />
        </div>
      </div>

      <FlatButton
        size="lg"
        label={signupLoading ? "Signing you up..." : "Signup with email"}
        disabled={signupLoading}
      />
    </form>
  );
}

export default BasicSignup;
