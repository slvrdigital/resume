import "@/styles/globals.css";

import Layout from "@/components/Layout";
import Meta from "@/components/Meta";
import { Inter } from "next/font/google";
import type { AppProps } from "next/app";

const inter = Inter({ subsets: ["latin"], weight: ["400"] });

export default function MyApp({ Component, pageProps }: AppProps) {
  const { meta } = pageProps;

  return (
    <>
      <Meta {...meta} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
