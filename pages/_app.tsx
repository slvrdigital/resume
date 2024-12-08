import Layout from "@/components/Layout";
import Meta from "@/components/Meta";
import Head from "next/head";
import type { AppProps } from "next/app";
import "@/styles/globals.css";

const config = require("../next.config");

export default function MyApp({ Component, pageProps }: AppProps) {
  const { meta } = pageProps;

  return (
    <>
      <Head>
        <base href={config.basePath + "/"} />
      </Head>
      <Meta {...meta} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
