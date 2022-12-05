import Logo from "../../public/logo.svg";

export function Sidebar() {
  return (
    <aside className="w-[300px] flex flex-col gap-4 py-4">
      <div className="h-[34px] flex items-center px-4">
        <Logo />
      </div>
    </aside>
  );
}
