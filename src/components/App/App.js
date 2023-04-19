import { Route, Routes, NavLink } from 'react-router-dom';
import { useState } from 'react';
import "./App.css";

import Main from "../Main/Main";
import StartPage from '../StartPage/StartPage';
import Address from '../Address/Address';
import Popup from '../Popup/Popup.js';

function App() {
  const startCoordinates = {coordinates: [55.7, 37.6], zoom: 10}

  const [place, setPlace] = useState({});
  const [addressRoute, setAddressRoute] = useState(false);
  const [startPlace, setStartPlace] = useState(startCoordinates);
  const [freePlaces, setFreePlaces] = useState([]);


  const data = [ {coordinates: [55.815559, 37.797137], zoom: 20, address: 'Улица Уральская, д. 7', 
  freePlaces: [[55.815560, 37.797137], [55.815571, 37.797137], [55.815582, 37.797137], [55.815593, 37.797137], [55.81600, 37.797137], [55.815610, 37.797137], [55.815620, 37.797137], [55.815630, 37.797137]], id: 1},
  {coordinates: [53.960544, 27.614661], zoom: 20, address: 'Улица Мирошниченко, д. 43 А', freePlaces: [[53.960555, 27.614661], [53.960566, 27.614661], [53.960577, 27.614661], [53.960588, 27.614661], 
  [53.960599, 27.614661], [53.960700, 27.614661], [53.960710, 27.614661], [53.960720, 27.614661], [53.960730, 27.614661], [53.960740, 27.614661], [53.960750, 27.614661], [53.960760, 27.614661], [53.960770, 27.614661], 
  [53.960780, 27.614661], [53.960790, 27.614661], [53.960800, 27.614661], [53.960810, 27.614661], [53.960820, 27.614661]], id: 2},
  {coordinates: [41.794093, 44.755011], zoom: 20, address: 'Улица Петри Ибери, д. 24', freePlaces: [], id: 3}

]

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
          <Route exact path="/" element={<StartPage />} />
            
          <Route path="start" element={<Main freePlaces={freePlaces} startPlace={startPlace} addressRoute={addressRoute} />} />
          
          <Route path="address" element={<><Main freePlaces={freePlaces} startPlace={startPlace} addressRoute={addressRoute}/> <Address place={place} /></>} />
          <Route path="popup" element={<Popup clickOnBack={clickOnBack} checkedAddress={startPlace} setAddressRoute={setAddressRoute} onClick={onClick} data={data} />} />
  </Routes>

  );
}

export default App;
