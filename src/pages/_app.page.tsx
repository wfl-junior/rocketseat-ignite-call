import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "~/lib/dayjs";
import { globalStyles } from "~/styles/global";

globalStyles();

const App: React.FC<AppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => (
  <Fragment>
    <Head>
      <title>Ignite Call</title>
    </Head>

    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>

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
