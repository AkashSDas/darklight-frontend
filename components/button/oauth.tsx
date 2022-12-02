import FacebookIcon from "../../public/social-icons/facebook.svg";
import TwitterIcon from "../../public/social-icons/twitter.svg";
import styles from "../../styles/components/button/oauth.module.css";

export function SignupWithFacebook() {
  function openSignupWindow() {}

  return (
    <button onClick={openSignupWindow} className={styles.btn}>
      <FacebookIcon />
    </button>
  );
}

export function LoginWithFacebook() {
  function openLoginWindow() {}

  return (
    <button onClick={openLoginWindow} className={styles.btn}>
      <FacebookIcon />
    </button>
  );
}

export function SignupWithTwitter() {
  function openSignupWindow() {}

  return (
    <button onClick={openSignupWindow} className={styles.btn}>
      <TwitterIcon />
    </button>
  );
}

export function LoginWithTwitter() {
  function openLoginWindow() {}

  return (
    <button onClick={openLoginWindow} className={styles.btn}>
      <TwitterIcon />
    </button>
  );
}
