import Layout from "@/components/Layout";
import Meta from "@/components/Meta";
import type { AppProps } from "next/app";
import "@/styles/globals.css";

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
