import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "~/lib/dayjs";
import { queryClient } from "~/lib/react-query";
import { globalStyles } from "~/styles/global";

globalStyles();

const App: React.FC<AppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => (
  <Fragment>
    <DefaultSeo
      title="Ignite Call"
      openGraph={{
        type: "website",
        locale: "pt_BR",
        siteName: "Ignite Call",
        url: "https://ignite-call.rocketseat.com.br",
      }}
    />

    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </QueryClientProvider>

    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  </Fragment>
);

export default App;
