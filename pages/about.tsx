import React from "react";
import Footer from "../components/Footer";

function About() {
  return (
    <div id="about">
      <h2 className="my-5 text-3xl font-bold">Permainan Teka Kata Ladle</h2>
      <div className="description">
        <p>
          Laman sesawang ini merupakan sebuah permainan teka kata yang
          menggunakan cara permainan popular, &quot;Wordle&quot;
          <br />
          <br />
          Terdapat pelbagai perkataan yang disediakan untuk anda bermain seperti
          kata dasar, kata ganda, kata berimbuhan dan sebagainya
          <br />
          <br />
        </p>
        <Footer />
      </div>
    </div>
  );
}

export default About;
