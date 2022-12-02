import Button from "../button";
import Logo from "../../public/logo.svg";

function Navbar() {
  return (
    <nav className="hidden lg:flex w-full h-[70px] px-8 items-center justify-between">
      <Logo />

      <div className="flex items-center justify-end gap-4">
        <Button variant="text">Explore</Button>
        <Button variant="text">Search</Button>
        <Button variant="text">Teach</Button>
        <div className="border-l border-l-border border-solid h-[22px]"></div>
        <Button variant="text">Login</Button>
        <Button variant="contained">Signup</Button>
      </div>
    </nav>
  );
}

export default Navbar;
