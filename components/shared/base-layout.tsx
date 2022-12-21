import Navbar from "./navbar";

interface Props {
  children: JSX.Element | JSX.Element[] | string | string[] | null;
}

export default function BaseLayout({ children }: Props): JSX.Element {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
