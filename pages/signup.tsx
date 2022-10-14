import { ReactElement } from "react";

import GoogleButton from "@components/buttons/google-button";
import OutlineIconButton from "@components/buttons/outline-icon-button";
import AuthLayout from "@components/layout/auth";
import BasicSignup from "@components/signup/basic";
import CompleteOAuthSignup from "@components/signup/complete-oauth";
import { useAppDispatch, useAppSelector } from "@hooks/store";
import { oauthSignup } from "@lib/oauth";
import Facebook from "@public/brand-svg/facebook.svg";
import Twitter from "@public/brand-svg/twitter.svg";
import { cancelOAuthSignupThunk } from "@store/auth/thunk";
import styles from "@styles/components/pages/signup.module.scss";

function SignupPage() {
  var user = useAppSelector((state) => state.user.data);
  var dispatch = useAppDispatch();

  return (
    <section className={styles.container}>
      <h1 className="-text-h3 mb-4">
        {user?.id ? "Complete your signup 👨🏻‍🚀" : "Create Account 👨🏻‍🚀"}
      </h1>

      {user?.id ? (
        <p>
          Your account {user.fullName} will be connected to your new DarkLight
          account. Wrong identity?{" "}
          <span
            className="text-blue2 cursor-pointer"
            onClick={() => dispatch(cancelOAuthSignupThunk())}
          >
            Start over
          </span>
        </p>
      ) : null}

      {user?.id ? null : (
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
      )}

      {user?.id ? null : (
        <div className={`${styles.or_divider} -text-body2`}>
          <hr />
          <span>or</span>
          <hr />
        </div>
      )}

      {user?.id ? <CompleteOAuthSignup /> : <BasicSignup />}
    </section>
  );
}

SignupPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default SignupPage;
