import Link from "next/link";
import { toast } from "react-hot-toast";
import { logout } from "services/auth.service";
import { useSWRConfig } from "swr";

import DarkLightLogo from "@public/logo.svg";

export default function Navbar(): JSX.Element {
  function VerticalLine(): JSX.Element {
    return (
      <div className="border-l border-solid border-l-border h-[22px]"></div>
    );
  }

  function LoggedOutActions(): JSX.Element {
    return (
      <>
        <Link href="/auth/login">
          <button>Login</button>
        </Link>

        <Link href="/auth/login">
          <button className="text-text3 bg-primary hover:bg-[#3446E5] active:bg-[#2E3ECC]">
            Signup
          </button>
        </Link>
      </>
    );
  }

  return (
    <nav className="px-8 w-full h-[70px] flex justify-between items-center">
      <DarkLightLogo />

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
        <LoggedOutActions />
        <LoggedInActions />
      </div>
    </nav>
  );
}

function LoggedInActions(): JSX.Element {
  var { mutate } = useSWRConfig();

  async function logoutUser() {
    await logout();
    await mutate("access-token", { success: null, accessToken: null });
    await mutate("user", { success: null, user: null, error: null });
    toast.success("Logged out successfully");
  }

  return (
    <>
      <button onClick={logoutUser}>Logout</button>
    </>
  );
}
