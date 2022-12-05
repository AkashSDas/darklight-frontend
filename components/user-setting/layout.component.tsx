import { Sidebar } from "./";

export function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Sidebar />
      {children}
    </div>
  );
}
