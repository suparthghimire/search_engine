import Layout from "@/layouts/MainLayout";
import Router, { useRouter } from "next/router";

import "@/styles/globals.css";
import "@/styles/nprogress.min.css";

import nProgress from "nprogress";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  Router.events.on("routeChangeStart", () => nProgress.start());
  Router.events.on("routeChangeComplete", () => nProgress.done());
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
