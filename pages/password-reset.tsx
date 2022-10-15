import ForgotPasswordForm from "@components/forgot-password";
import AuthLayout from "@components/layout/auth";
import PasswordResetForm from "@components/password-reset";
import styles from "@styles/components/pages/signup.module.scss";
import { ReactElement } from "react";

function PasswordResetPage() {
  return (
    <section className={styles.container}>
      <h1 className="-text-h3 mb-4">Password Reset 👨🏻‍🚀</h1>
      <p className="text-center">Enter your new password</p>

      <PasswordResetForm />
    </section>
  );
}

PasswordResetPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default PasswordResetPage;
