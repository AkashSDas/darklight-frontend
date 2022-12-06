import { Navbar, Sidebar } from "./";

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
