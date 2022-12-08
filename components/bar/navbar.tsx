import Link from "next/link";
import { useSWRConfig } from "swr";

import { useUser } from "../../lib/hooks.lib";
import Logo from "../../public/logo.svg";
import { logout } from "../../services/auth.service";
import { RegularButton } from "../button/regular";

export function Navbar() {
  var { user } = useUser();
  var { mutate } = useSWRConfig();

  async function logoutUser() {
    await logout();
    await mutate("access-token", { success: null, accessToken: null });
    await mutate("user", { success: null, user: null, error: null });
  }

  return (
    <nav className="hidden lg:flex w-full h-[70px] px-8 items-center justify-between">
      <Logo />

      <div className="flex items-center justify-end gap-4">
        <RegularButton variant="text">Explore</RegularButton>
        <RegularButton variant="text">Search</RegularButton>
        <RegularButton variant="text">Teach</RegularButton>
        <div className="border-l border-l-border border-solid h-[22px]"></div>
        {!user && (
          <>
            <Link href="/auth/login">
              <RegularButton variant="text">Login</RegularButton>
            </Link>

            <Link href="/auth/signup">
              <RegularButton variant="contained">Signup</RegularButton>
            </Link>
          </>
        )}

        {user && (
          <RegularButton onClick={logoutUser} variant="text">
            Logout
          </RegularButton>
        )}
      </div>
    </nav>
  );
}
