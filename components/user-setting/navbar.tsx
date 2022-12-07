import Image from "next/image";
import Link from "next/link";

import { useUser } from "../../lib/hooks.lib";
import { RegularButton } from "../button";
import { IconButton } from "../button/icons";
import { MenuIcon, SearchIcon, SettingsIcon } from "../icons";

export function Navbar() {
  var { user } = useUser();

  return (
    <nav className="h-[70px] px-4 w-full flex items-center justify-end">
      <div className="flex items-center gap-3">
        <RegularButton variant="text">Explore</RegularButton>
        <RegularButton variant="text">Teach</RegularButton>
        <div className="border-l border-l-border border-solid h-[22px]"></div>
        <IconButton icon={<SearchIcon size="20" />} />
        <Link href="/settings/basic">
          <IconButton icon={<SettingsIcon size="20" />} />
        </Link>
        <IconButton icon={<MenuIcon size="20" />} />

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
      </div>
    </nav>
  );
}
