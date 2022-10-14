import FlatButton from "@components/buttons/flat-button";
import FormLabel from "@components/form/label";
import styles from "@styles/components/signup/basic.module.scss";

function BasicSignup() {
  return (
    <form className={styles.container}>
      {/* ================= Fullname and username ================= */}
      <div className={styles.inline_group}>
        <div className={styles.input_group}>
          <FormLabel label="Fullname" htmlFor="fullname" />
          <input
            id="fullname"
            name="fullname"
            type="text"
            autoComplete="off"
            required
          />
        </div>

        <div className={styles.input_group}>
          <FormLabel label="Username" htmlFor="username" />
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="off"
            required
          />
        </div>
      </div>

      {/* ================= Email ================= */}
      <div className={styles.input_group}>
        <FormLabel label="Email" htmlFor="email" />
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="off"
          required
        />
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
            required
          />
        </div>

        <div className={styles.input_group}>
          <FormLabel label="Confirm Password" htmlFor="confirmPassword" />
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="off"
            required
          />
        </div>
      </div>

      <FlatButton size="lg" label="Signup with email" />
    </form>
  );
}

export default BasicSignup;
