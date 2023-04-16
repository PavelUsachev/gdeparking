import "./Main.css";
import MapComponent from '../MapComponent/MapComponent.js';
import Footer from "../Footer/Footer.js";

function Main({addressRoute}) {

  return (
    <main className="main">
      <MapComponent />
      <Footer addressRoute={addressRoute} />
    </main>
  );
}

export default Main;
