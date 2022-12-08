import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";

export function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Sidebar />

      <div className="ml-[300px]">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
