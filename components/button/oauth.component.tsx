import FacebookIcon from "../../public/social-icons/facebook.svg";
import TwitterIcon from "../../public/social-icons/twitter.svg";
import styles from "../../styles/components/button/oauth.module.css";

export function SignupWithFacebook() {
  function openSignupWindow() {
    window.open(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup/facebook`,
      "_self"
    );
  }

  return (
    <button onClick={openSignupWindow} className={styles.btn}>
      <FacebookIcon />
    </button>
  );
}

export function LoginWithFacebook() {
  function openLoginWindow() {
    window.open(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login/facebook`,
      "_self"
    );
  }

  return (
    <button onClick={openLoginWindow} className={styles.btn}>
      <FacebookIcon />
    </button>
  );
}

export function SignupWithTwitter() {
  function openSignupWindow() {
    window.open(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup/twitter`,
      "_self"
    );
  }

  return (
    <button onClick={openSignupWindow} className={styles.btn}>
      <TwitterIcon />
    </button>
  );
}

export function LoginWithTwitter() {
  function openLoginWindow() {
    window.open(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login/twitter`,
      "_self"
    );
  }

  return (
    <button onClick={openLoginWindow} className={styles.btn}>
      <TwitterIcon />
    </button>
  );
}
