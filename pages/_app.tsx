import "@styles/globals.scss";

import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

import OAuthPrefetch from "@components/auth/oauth-prefetch";
import store from "@store/index";
import BasicAuthPrefetch from "@components/auth/basic-auth-prefetch";

/** Page type for pages which has a `layout` */
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

/** Page prop type for pages which has a `layout` */
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): ReactElement {
  // Use the layout defined at the page level, if available
  var getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <Provider store={store}>
        <OAuthPrefetch>
          <BasicAuthPrefetch>
            {getLayout(<Component {...pageProps} />)}
          </BasicAuthPrefetch>
        </OAuthPrefetch>
      </Provider>
      <Toaster />
    </>
  );
}

export default MyApp;
