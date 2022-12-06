import Link from "next/link";
import { useRouter } from "next/router";

import Settings from "../../public/icons/settings.svg";
import Logo from "../../public/logo.svg";
import { CollectionIcon, PaymentCardIcon, SettingsIcon, UserCircleIcon } from "../icons";

export function Sidebar() {
  return (
    <aside className="w-[300px] flex flex-col gap-4 py-4 h-full fixed border border-solid border-border">
      <div className="h-[34px] flex items-center px-4">
        <Link href="/" className="cursor-pointer">
          <Logo />
        </Link>
      </div>

      <ul>
        <SidebarItem
          id="basic"
          icon={<SettingsIcon size="18" />}
          label="Basic settings"
        />
        <SidebarItem
          id="enrolled"
          icon={<CollectionIcon size="18" />}
          label="Courses enrolled in"
        />
        <SidebarItem
          id="billing"
          icon={<PaymentCardIcon size="18" />}
          label="Services & Billing"
        />
        <SidebarItem
          id="teacher"
          icon={<UserCircleIcon size="18" />}
          label="Teacher"
        />
      </ul>
    </aside>
  );
}

function SidebarItem({
  id,
  label,
  icon,
}: {
  id: string;
  label: string;
  icon: JSX.Element;
}) {
  var router = useRouter();

  return (
    <Link href={`/settings/${id}`}>
      <li
        className={`${
          router.pathname?.includes(id) && "bg-background3"
        } text-[#555555] h-11 w-full flex items-center px-4 gap-3 cursor-pointer hover:bg-background3 active:bg-border`}
      >
        <div>{icon}</div>
        <div>{label}</div>
      </li>
    </Link>
  );
}
