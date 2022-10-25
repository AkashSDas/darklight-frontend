import { ReactElement } from "react";

import ForgotPasswordForm from "@components/auth/forgot-password";
import AuthLayout from "@components/layout/auth";
import styles from "@styles/components/pages/signup.module.scss";

function ForgotPassword() {
  return (
    <section className={styles.container}>
      <h1 className="-text-h3 mb-4">Forgot Password 👨🏻‍🚀</h1>
      <p className="text-center">
        Enter the email address you used when you joined and we will send you
        instructions to reset your password.
      </p>

      <ForgotPasswordForm />
    </section>
  );
}

ForgotPassword.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default ForgotPassword;
