import "../styles/globals.css";

import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

import { gilroy, urbanist } from "../lib/font";
import store from "../store";

import type { AppProps } from "next/app";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout };

export var stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC as string
);

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  var getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Elements stripe={stripePromise}>
      <Provider store={store}>
        <div className={`${urbanist.variable} ${gilroy.variable}  font-sans`}>
          {getLayout(<Component {...pageProps} />)}
          <Toaster />
        </div>
      </Provider>
    </Elements>
  );
}
