import Head from "next/head";
import React from "react";
import Navigation from "./Navigation";
import Viewidth from "./Viewidth";

function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Permainan Teka Kata Ladle</title>
        <meta
          name="description"
          content="Ladle? Senduk? Cubalah permainan ini sekarang untuk meningkatkan kosa kata dalam Bahasa Melayu"
        />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://ladle-next.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Permainan Teka Kata Ladle" />
        <meta
          property="og:description"
          content="Ladle? Senduk? Cubalah permainan ini sekarang untuk meningkatkan kosa kata dalam Bahasa Melayu"
        />
        <meta
          property="og:image"
          content="https://mobileimages.lowes.com/productimages/4e36c363-8d98-4689-b41d-640597b2d2ac/08712499.jpg?size=pdhism"
        />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="ladle-next.vercel.app" />
        <meta property="twitter:url" content="https://ladle-next.vercel.app" />
        <meta name="twitter:title" content="Permainan Teka Kata Ladle" />
        <meta
          name="twitter:description"
          content="Ladle? Senduk? Cubalah permainan ini sekarang untuk meningkatkan kosa kata dalam Bahasa Melayu"
        />
        <meta
          name="twitter:image"
          content="https://mobileimages.lowes.com/productimages/4e36c363-8d98-4689-b41d-640597b2d2ac/08712499.jpg?size=pdhism"
        />

        {/* <!-- Meta Tags Generated via https://www.opengraph.xyz --> */}
      </Head>
      <Navigation />
      <Viewidth>
        <main className="content">{children}</main>
      </Viewidth>
    </>
  );
}

export default Layout;
