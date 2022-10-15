import FlatButton from "@components/buttons/flat-button";
import FormLabel from "@components/form/label";
import { useAppDispatch, useAppSelector } from "@hooks/store";
import { passwordResetValidation } from "@lib/validations";
import { passwordResetThunk } from "@store/auth/thunk";
import styles from "@styles/components/signup/basic.module.scss";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function PasswordResetForm() {
  var router = useRouter();
  var dispatch = useAppDispatch();
  var { passwordResetLoading } = useAppSelector((state) => state.auth);
  var [token, setToken] = useState(null);

  useEffect(
    function getPasswordResetToken() {
      if (router.query?.token) setToken(router.query.token);
    },
    [router.query]
  );

  // ===============================================
  // Formik settings
  // ===============================================

  var initialValues = {
    password: "",
    confirmPassword: "",
  };

  async function handleSubmit(values: typeof initialValues) {
    if (!token || token.length < 1) return;

    await dispatch(
      passwordResetThunk({
        token,
        password: values.password,
        confirmPassword: values.confirmPassword,
      })
    );
  }

  var formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: passwordResetValidation,
  });

  var { handleBlur, handleChange, values: formValues } = formik;

  // ===============================================
  // JSX
  // ===============================================

  function InputValidationMsg({ name }: { name: string }) {
    return (
      <span className={`${styles.error_msg} -text-cap`}>
        {formik.touched[name] && formik.errors[name]}
      </span>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit} className={styles.container}>
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
        label={
          passwordResetLoading ? "Updating your password..." : "Reset password"
        }
        disabled={passwordResetLoading}
      />
    </form>
  );
}

export default PasswordResetForm;
