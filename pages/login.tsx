import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import touch from "react-hot-toast";

import LoginForm from "@components/auth/login";
import GoogleButton from "@components/buttons/google-button";
import OutlineIconButton from "@components/buttons/outline-icon-button";
import AuthLayout from "@components/layout/auth";
import { oauthLogin, oauthSignup } from "@lib/oauth";
import Facebook from "@public/brand-svg/facebook.svg";
import Twitter from "@public/brand-svg/twitter.svg";
import styles from "@styles/components/pages/signup.module.scss";

function LoginPage() {
  var router = useRouter();

  useEffect(
    function checkOAuthLoginFailure() {
      var { info } = router.query;
      if (info && info == "signup-invalid") {
        touch.error("You don't have an account OR your signup is incomplete");
      }
    },
    [router.query]
  );

  return (
    <section className={styles.container}>
      <h1 className="-text-h3 mb-4">Login 👨🏻‍🚀</h1>

      <div className={styles.oauth_providers}>
        <GoogleButton
          label="Login with Google"
          onClick={() => oauthLogin("google")}
        />
        <OutlineIconButton
          icon={<Twitter />}
          onClick={() => oauthLogin("twitter")}
        />
        <OutlineIconButton
          icon={<Facebook />}
          onClick={() => oauthLogin("facebook")}
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
