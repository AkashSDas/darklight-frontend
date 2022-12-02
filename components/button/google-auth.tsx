import GoogleIcon from "../../public/social-icons/google.svg";
import styles from "../../styles/components/button/google-auth.module.css";

export function SignupWithGoogle() {
  function openSignupWindow() {}

  return (
    <button onClick={openSignupWindow} className={styles.btn}>
      <GoogleIcon />
      <span className={styles.btn__text}>Signup with Google</span>
    </button>
  );
}

export function LoginWithGoogle() {
  function openLoginWindow() {}

  return (
    <button onClick={openLoginWindow} className={styles.btn}>
      <GoogleIcon />
      <span className={styles.btn__text}>Login with Google</span>
    </button>
  );
}
