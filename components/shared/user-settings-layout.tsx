import SidebarNavbar from "./sidebar-navbar";
import UserSettingsSidebar from "./user-settings-sidebar";

interface Props {
  children: JSX.Element | JSX.Element[] | string | string[] | null;
}

export default function UserSettingLayout({ children }: Props): JSX.Element {
  return (
    <div>
      <UserSettingsSidebar />

      <div className="ml-[300px]">
        <SidebarNavbar />
        {children}
      </div>
    </div>
  );
}
