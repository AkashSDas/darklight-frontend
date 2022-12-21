import Link from "next/link";
import { useRouter } from "next/router";

import DarkLightLogo from "@public/logo.svg";

import { CollectionIcon, PaymentIcon, SettingsIcon, UserProfileIcon } from "./icons";

export default function UserSettingsSidebar(): JSX.Element {
  return (
    <div className="fixed py-4 h-full w-[300px] flex flex-col gap-4 border border-solid border-border">
      {/* Logo */}
      <div className="h-[34px] flex items-center px-4">
        <Link href="/" className="cursor-pointer">
          <DarkLightLogo />
        </Link>
      </div>

      {/* Sidebar items */}
      <ul>
        <SidebarItem
          id="basic"
          icon={<SettingsIcon size="size_5" />}
          label="Basic settings"
        />
        <SidebarItem
          id="enrolled"
          icon={<CollectionIcon size="size_5" />}
          label="Courses enrolled in"
        />
        <SidebarItem
          id="billing"
          icon={<PaymentIcon size="size_5" />}
          label="Services & Billing"
        />
        <SidebarItem
          id="teacher"
          icon={<UserProfileIcon size="size_5" />}
          label="Teacher"
        />
      </ul>
    </div>
  );
}

interface SidebarItemProps {
  id: string;
  label: string;
  icon: JSX.Element;
}

function SidebarItem(props: SidebarItemProps): JSX.Element {
  var router = useRouter();
  var isActive = router.pathname?.includes(props.id) && "bg-background3";

  return (
    <Link href={`/settings/${props.id}`}>
      <li
        className={`${isActive} px-4 h-11 w-full flex gap-3 items-center cursor-pointer hover:bg-background3 active:bg-border`}
      >
        <span className="icon">{props.icon}</span>
        <span>{props.label}</span>
      </li>
    </Link>
  );
}
