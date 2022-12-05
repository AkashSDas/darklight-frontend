import "../styles/globals.css";

import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
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

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout };

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  var getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      <div className={`${urbanist.variable} ${gilroy.variable} font-sans`}>
        {getLayout(<Component {...pageProps} />)}
        <Toaster />
      </div>
    </Provider>
  );
}
