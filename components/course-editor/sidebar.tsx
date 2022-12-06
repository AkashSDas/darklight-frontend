import Link from "next/link";
import { useRouter } from "next/router";

import Logo from "../../public/logo.svg";
import { CollectionIcon, PaymentCardIcon, SettingsIcon, UserCircleIcon } from "../icons";
import { EyeIcon } from "../icons/eye";
import { MobileIcon } from "../icons/mobile";

export default function Sidebar() {
  return (
    <aside className="w-[300px] flex flex-col gap-4 py-4 h-full fixed border border-solid border-border">
      <div className="h-[34px] flex items-center px-4">
        <Link href="/" className="cursor-pointer">
          <Logo />
        </Link>
      </div>

      <ul>
        <SidebarItem
          id="settings"
          icon={<SettingsIcon size="18" />}
          label="Basic settings"
        />
        <SidebarItem
          id="permission"
          icon={<UserCircleIcon size="18" />}
          label="Permission"
        />
        <SidebarItem
          id="billing"
          icon={<PaymentCardIcon size="18" />}
          label="Services & Billing"
        />
        <SidebarItem
          id="preview"
          icon={<EyeIcon size="18" />}
          label="Public view"
        />
        <SidebarItem
          id="overview"
          icon={<MobileIcon size="18" />}
          label="Course overview"
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
