import Image from "next/image";
import Link from "next/link";

import { useUser } from "@lib/hooks.lib";

import { VerticalLine } from "./base-navbar";
import { SettingsIcon } from "./icons";

export default function SidebarNavbar(): JSX.Element {
  var { user } = useUser();

  return (
    <nav className="h-[70px] px-4 w-full flex items-center justify-end">
      <div className="flex gap-3 items-center">
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

function LoggedInActions(): JSX.Element {
  return (
    <>
      <Link href="/settings/basic">
        <button className="icon_btn">
          <SettingsIcon size="size_5" />
        </button>
      </Link>

      <ProfileImage />
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

function ProfileImage(): JSX.Element {
  var { user } = useUser();

  return (
    <div className="w-[60px] h-[44px] relative">
      <Image
        src={
          user?.profileImage?.URL ??
          "https://media.giphy.com/media/9PgvV8ale90lQwfQTZ/giphy-downsized.gif"
        }
        alt="User avatar"
        fill
        className="object-cover rounded-2xl"
      />
    </div>
  );
}
