import React from "react";
import "./Main.css";
import MapComponent from "../MapComponent/MapComponent.js";
import Footer from "../Footer/Footer.js";

function Main({ data }) {
  return (
    <main className="main">
      <MapComponent data={data} />
      <Footer />
    </main>
  );
}

export default Main;
