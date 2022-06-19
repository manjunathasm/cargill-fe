import React from "react";
import Head from "next/head";
import "antd/dist/antd.css";
import "../styles/globals.css";

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Cargill</title>
        <meta name="description" content="Generated by create next app" />
        <link
          rel="shortcut icon"
          href="https://www.cargill.co.in/CCOM/assets/images/favicon.ico"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
