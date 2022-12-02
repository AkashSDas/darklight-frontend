import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Urbanist } from "@next/font/google";
import localFont from "@next/font/local";
import { Navbar } from "../components/bar";

const urbanist = Urbanist({ variable: "--font-urbanist" });
const gilroy = localFont({
  src: "../public/fonts/gilroy-extrabold.otf",
  variable: "--font-gilroy",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${urbanist.variable} ${gilroy.variable} font-sans`}>
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}
