import Link from "next/link";
import { toast } from "react-hot-toast";
import { logout } from "services/auth.service";

import { useUser } from "@lib/hooks.lib";
import DarkLightLogo from "@public/logo.svg";

export default function Navbar(): JSX.Element {
  var { user } = useUser();

  return (
    <nav className="px-8 w-full h-[70px] flex justify-between items-center">
      <Link href="/">
        <DarkLightLogo />
      </Link>

      <div className="flex gap-4 justify-end items-center">
        <Link href="/explore">
          <button>Explore</button>
        </Link>

        <Link href="/search">
          <button>Search</button>
        </Link>

        <Link href="/teach">
          <button>Teach</button>
        </Link>

        <VerticalLine />
        {!user ? <LoggedOutActions /> : <LoggedInActions />}
      </div>
    </nav>
  );
}

function VerticalLine(): JSX.Element {
  return <div className="border-l border-solid border-l-border h-[22px]"></div>;
}

function LoggedInActions(): JSX.Element {
  var { user, accessToken, mutateAccessToken, mutateUser } = useUser();

  async function logoutUser() {
    if (!user) return;

    var userAuthType = accessToken ? "accessToken" : "oauth";
    if (accessToken) {
      await mutateAccessToken(
        { success: true, accessToken: null, user: null },
        { revalidate: false }
      );
    } else if (user) {
      await mutateUser({ success: true, user: null }, { revalidate: false });
    }

    toast.success("Logged out successfully");
    await logout();
    if (userAuthType == "accessToken") await mutateAccessToken();
    else await mutateUser();
  }

  return (
    <>
      <button onClick={logoutUser}>Logout</button>
    </>
  );
}

function LoggedOutActions(): JSX.Element {
  return (
    <>
      <Link href="/auth/login">
        <button>Login</button>
      </Link>

      <Link href="/auth/signup">
        <button className="text-text3 bg-primary hover:bg-[#3446E5] active:bg-[#2E3ECC]">
          Signup
        </button>
      </Link>
    </>
  );
}
