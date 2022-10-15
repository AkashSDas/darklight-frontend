import Image from "next/image";
import Link from "next/link";

import OutlineButton from "@components/buttons/outline-button";
import Logo from "@public/brand-svg/darklight.svg";
import styles from "@styles/components/layout/auth.module.scss";

function AuthLayout({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.poster_container}>
        <Image
          src="/posters/auth-side.jpg"
          alt="Poster"
          objectFit="cover"
          layout="fill"
        />
      </div>

      <main className={styles.content}>
        <nav>
          <Logo />
          <OutlineButton size="sm" label="Login" />
        </nav>

        {children}
      </main>
    </div>
  );
}

export default AuthLayout;
