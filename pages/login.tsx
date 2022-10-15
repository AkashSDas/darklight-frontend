import AuthLayout from "@components/layout/auth";
import { ReactElement } from "react";
import styles from "@styles/components/pages/signup.module.scss";
import GoogleButton from "@components/buttons/google-button";
import OutlineIconButton from "@components/buttons/outline-icon-button";
import { oauthSignup } from "@lib/oauth";
import Facebook from "@public/brand-svg/facebook.svg";
import Twitter from "@public/brand-svg/twitter.svg";
import LoginForm from "@components/login";

function LoginPage() {
  return (
    <section className={styles.container}>
      <h1 className="-text-h3 mb-4">Login 👨🏻‍🚀</h1>

      <div className={styles.oauth_providers}>
        <GoogleButton
          label="Signup with Google"
          onClick={() => oauthSignup("google")}
        />
        <OutlineIconButton
          icon={<Twitter />}
          onClick={() => oauthSignup("twitter")}
        />
        <OutlineIconButton
          icon={<Facebook />}
          onClick={() => oauthSignup("facebook")}
        />
      </div>

      <div className={`${styles.or_divider} -text-body2`}>
        <hr />
        <span>or</span>
        <hr />
      </div>

      <LoginForm />
    </section>
  );
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default LoginPage;
