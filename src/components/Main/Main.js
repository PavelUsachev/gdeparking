import React from "react";
import "./Main.css";
import MapComponent from "../MapComponent/MapComponent.js";
import NumberParking from "../NumberParking/NumberParking.js";
import Footer from "../Footer/Footer.js";

function Main({ data }) {
  return (
    <main className="main">
      <MapComponent data={data} />
      {window.location.pathname === `/camera/${data?.id}` ? (
        <NumberParking data={data} />
      ) : (
        ""
      )}
      <Footer />
    </main>
  );
}

export default Main;
