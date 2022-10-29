import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { GameProvider } from "../contexts/GameContext";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
