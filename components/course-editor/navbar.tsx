import Image from "next/image";
import Link from "next/link";

import { useUser } from "../../lib/hooks.lib";
import { RegularButton } from "../button";
import { IconButton } from "../button/icons.component";
import { MenuIcon, SearchIcon, SettingsIcon } from "../icons";
import { AnnouncementIcon } from "../icons/announcment";
import { NotificationIcon } from "../icons/notification";

export default function Navbar() {
  return (
    <nav className="h-[34px] px-4 w-full flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center h-[34px] px-2 text-[#BFBFBF]">
          Edited 5m ago
        </div>
        <IconButton icon={<NotificationIcon size="20" />} />
        <IconButton icon={<AnnouncementIcon size="20" />} />
        <IconButton icon={<SearchIcon size="20" />} />
        <IconButton icon={<MenuIcon size="20" />} />
      </div>
    </nav>
  );
}