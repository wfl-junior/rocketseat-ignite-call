import type { AppProps } from "next/app";
import Head from "next/head";
import { Fragment } from "react";
import { globalStyles } from "~/styles/global";

globalStyles();

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <Fragment>
    <Head>
      <title>Ignite Call</title>
    </Head>

    <Component {...pageProps} />
  </Fragment>
);

export default App;
