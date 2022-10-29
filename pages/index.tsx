import Link from "next/link";
import React from "react";
import AppName from "../components/AppName";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";

function Home() {
  return (
    <div id="home">
      <div className="hero py-32 text-center">
        <div className="brand-name mx-auto mt-10 mb-5 flex  justify-center">
          <AppName className="mx-auto max-w-full scale-150" />
        </div>
        <div className="simple-description">
          <div className="desc mb-3 text-gray-900">
            Permainan Teka Kata Dalam Talian
          </div>
          <div className="quote bg-gray-100 py-2">
            <p className="mx-auto w-1/2 text-gray-900">
              <q>
                <i className="">
                  Tingkatkan kosa kata anda dengan permainan ini :D
                </i>
              </q>
              <small className="block text-right">
                Ching Chong, Orang baik
              </small>
            </p>
          </div>
        </div>
      </div>

      <div className="cta mx-auto flex justify-center">
        <Link href="/game">
          <button
            className="
          font-  rounded border border-gray-300 p-2 px-5 shadow-sm
          transition-all
          hover:scale-105
          active:focus:bg-gray-100
          "
          >
            Main Sekarang
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export const getServerSideProps = () => {
  return {
    props: {},
  };
};

export default Home;
