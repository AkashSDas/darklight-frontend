import Image from "next/image";
import Link from "next/link";

import OutlineButton from "@components/buttons/outline-button";
import Logo from "@public/brand-svg/darklight.svg";
import styles from "@styles/components/layout/auth.module.scss";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@hooks/store";
import { logoutThunk } from "@store/auth/thunk";

function AuthLayout({ children }) {
  var router = useRouter();
  var user = useAppSelector((state) => state.user.data);
  var dispatch = useAppDispatch();

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
          <div className="cursor-pointer" onClick={() => router.push("/")}>
            <Logo />
          </div>

          <OutlineButton
            size="sm"
            label={
              user?.email && user?.username
                ? "Logout"
                : router.pathname == "/login"
                ? "Signup"
                : "Login"
            }
            onClick={async () => {
              if (user?.email && user?.username) {
                await dispatch(logoutThunk());
              } else {
                if (router.pathname == "/login") router.push("/signup");
                else router.push("/login");
              }
            }}
          />
        </nav>

        {children}
      </main>
    </div>
  );
}

export default AuthLayout;
