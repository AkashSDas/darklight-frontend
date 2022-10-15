import FlatButton from "@components/buttons/flat-button";
import FormLabel from "@components/form/label";
import { useAppDispatch, useAppSelector } from "@hooks/store";
import { forgotPasswordValidation } from "@lib/validations";
import { forgotPasswordThunk } from "@store/auth/thunk";
import styles from "@styles/components/signup/basic.module.scss";
import { useFormik } from "formik";
import { IForgotPasswordPayload } from "services/auth";

function ForgotPasswordForm() {
  var dispatch = useAppDispatch();
  var { forgotPasswordLoading } = useAppSelector((state) => state.auth);

  // ===============================================
  // Formik settings
  // ===============================================

  var initialValues: IForgotPasswordPayload = { email: "" };

  async function handleSubmit(values: IForgotPasswordPayload) {
    await dispatch(forgotPasswordThunk(values.email));
  }

  var formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: forgotPasswordValidation,
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

      <FlatButton
        size="lg"
        label={
          forgotPasswordLoading ? "Sending you a mail..." : "Send instructions"
        }
        disabled={forgotPasswordLoading}
      />
    </form>
  );
}

export default ForgotPasswordForm;
