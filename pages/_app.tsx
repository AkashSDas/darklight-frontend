import "../styles/globals.css";

import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

import { Urbanist } from "@next/font/google";
import localFont from "@next/font/local";

import { Navbar } from "../components/bar";
import store from "../store";

import type { AppProps } from "next/app";
const urbanist = Urbanist({ variable: "--font-urbanist" });
const gilroy = localFont({
  src: "../public/fonts/gilroy-extrabold.otf",
  variable: "--font-gilroy",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className={`${urbanist.variable} ${gilroy.variable} font-sans`}>
        <Navbar />
        <Component {...pageProps} />

        <Toaster />
      </div>
    </Provider>
  );
}
