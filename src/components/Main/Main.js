import "./Main.css";
import MapComponent from '../MapComponent/MapComponent.js';
import Footer from "../Footer/Footer.js";

function Main({freePlaces, startPlace, addressRoute}) {

  return (
    <main className="main">
      <MapComponent freePlaces={freePlaces} startPlace={startPlace} />
      <Footer addressRoute={addressRoute} />
    </main>
  );
}

export default Main;
