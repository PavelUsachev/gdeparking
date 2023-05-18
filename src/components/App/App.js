import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "./App.css";

import Main from "../Main/Main";
import StartPage from '../StartPage/StartPage';
import Address from '../Address/Address';
import Popup from '../Popup/Popup.js';
import NotFound from '../NotFound/NotFound';

function App() {
  const startCoordinates = {coordinates: [55.7, 37.6], zoom: 10}
  const address = JSON.parse(localStorage.getItem("place"));
  console.log(address);

  const [place, setPlace] = useState(address);
  const [addressRoute, setAddressRoute] = useState(!address || Object.keys(address).length === 0 ? false : true);
  const [startPlace, setStartPlace] = useState(!address || Object.keys(address).length === 0 ? startCoordinates : {coordinates: address.coordinates, zoom: address.zoom});
  const [freePlaces, setFreePlaces] = useState(!address || Object.keys(address).length === 0 ? 0 : address.freePlaces);

  useEffect(() => {
    localStorage.setItem("place", JSON.stringify(place));
  }, [place])



  const data = [ {coordinates: [55.815559, 37.797137], zoom: 20, address: 'Улица Уральская, д. 7', 
  freePlaces: [[55.815560, 37.797137], [55.815571, 37.797137], [55.815582, 37.797137], [55.815593, 37.797137], [55.81600, 37.797137], [55.815610, 37.797137], [55.815620, 37.797137], [55.815630, 37.797137]], id: 1},
  {coordinates: [53.960544, 27.614661], zoom: 20, address: 'Улица Мирошниченко, д. 43 А', freePlaces: [[53.960555, 27.614661], [53.960566, 27.614661], [53.960577, 27.614661], [53.960588, 27.614661], 
  [53.960599, 27.614661], [53.960700, 27.614661], [53.960710, 27.614661], [53.960720, 27.614661], [53.960730, 27.614661], [53.960740, 27.614661], [53.960750, 27.614661], [53.960760, 27.614661], [53.960770, 27.614661], 
  [53.960780, 27.614661], [53.960790, 27.614661], [53.960800, 27.614661], [53.960810, 27.614661], [53.960820, 27.614661]], id: 2},
  {coordinates: [41.794093, 44.755011], zoom: 20, address: 'Улица Петри Ибери, д. 24', freePlaces: [], id: 3}

]

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

function clickOnBack () {
  setAddressRoute(false);
  setPlace({});
  setStartPlace(startCoordinates);
  setFreePlaces([]);
}

  function onClick(event) {
    data.forEach(item => {
      if (item.address === event.target.textContent) {
        setPlace(item);
        const {coordinates, zoom} = item;
        setStartPlace({coordinates, zoom});
        setFreePlaces(item.freePlaces);
      }
    })
  }

  return (
    <Routes>
            
          <Route path="start" element={<Main freePlaces={freePlaces} startPlace={startPlace} addressRoute={addressRoute} />} />
          
          <Route path="address" element={<><Main freePlaces={freePlaces} startPlace={startPlace} addressRoute={addressRoute}/> <Address place={place} /></>} />
          <Route path="popup" element={<Popup clickOnBack={clickOnBack} checkedAddress={startPlace} setAddressRoute={setAddressRoute} onClick={onClick} data={data} />} />
          <Route exact path="/" element={<StartPage />} />
  				<Route path="*" element={<NotFound />} />
		</Routes>

  );
}

export default App;
