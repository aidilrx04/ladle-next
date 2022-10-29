import Head from "next/head";
import React from "react";
import Navigation from "./Navigation";
import Viewidth from "./Viewidth";

function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Permainan Teka Kata Ladle</title>
        <meta property="og:title" content="Permainan Teka Kata Ladle" />
        <meta property="og:site_name" content="Ladle" />
        <meta property="og:url" content="https://ladle-next.vercel.app" />
        <meta
          property="og:description"
          content="Ladle? Senduk?

Cubalah permainan ini sekarang untuk meningkatkan kosa kata dalam Bahasa Melayu"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://mobileimages.lowes.com/productimages/4e36c363-8d98-4689-b41d-640597b2d2ac/08712499.jpg?size=pdhism"
        />
      </Head>
      <Navigation />
      <Viewidth>
        <main className="content">{children}</main>
      </Viewidth>
    </>
  );
}

export default Layout;
