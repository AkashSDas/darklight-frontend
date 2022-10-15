import FlatButton from "@components/buttons/flat-button";
import FormLabel from "@components/form/label";
import { useAppDispatch, useAppSelector } from "@hooks/store";
import { loginValidation } from "@lib/validations";
import { loginThunk } from "@store/auth/thunk";
import styles from "@styles/components/signup/basic.module.scss";
import { useFormik } from "formik";
import Link from "next/link";
import { ILoginPayload } from "services/auth";

function LoginForm() {
  var dispatch = useAppDispatch();
  var { loginLoading } = useAppSelector((state) => state.auth);

  // ===============================================
  // Formik settings
  // ===============================================

  var initialValues: ILoginPayload = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  async function handleSubmit(values: ILoginPayload) {
    await dispatch(loginThunk(values));
  }

  var formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: loginValidation,
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
      {/* ================= Email ================= */}
      <div className={styles.input_group}>
        <FormLabel
          label="Email"
          htmlFor="email"
          rightElement={
            <Link href="/forgot-password">
              <span className="text-blue2 cursor-pointer">
                Forgot password?
              </span>
            </Link>
          }
        />
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
        label={loginLoading ? "Logging you up..." : "Login with email"}
        disabled={loginLoading}
      />
    </form>
  );
}

export default LoginForm;
