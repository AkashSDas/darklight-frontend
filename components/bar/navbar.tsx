import Logo from "../../public/logo.svg";
import { RegularButton } from "../button";

export function Navbar() {
  return (
    <nav className="hidden lg:flex w-full h-[70px] px-8 items-center justify-between">
      <Logo />

      <div className="flex items-center justify-end gap-4">
        <RegularButton variant="text">Explore</RegularButton>
        <RegularButton variant="text">Search</RegularButton>
        <RegularButton variant="text">Teach</RegularButton>
        <div className="border-l border-l-border border-solid h-[22px]"></div>
        <RegularButton variant="text">Login</RegularButton>
        <RegularButton variant="contained">Signup</RegularButton>
      </div>
    </nav>
  );
}
