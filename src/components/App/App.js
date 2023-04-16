import { useState } from "react";

import { Route, Routes, NavLink } from 'react-router-dom';
import "./App.css";

import Main from "../Main/Main";
import StartPage from '../StartPage/StartPage';
import Address from '../Address/Address';
import Popup from '../Popup/Popup.js';

function App() {
  const [street, setStreet] = useState('');
  const [places, setPlaces] = useState(0);
  const [addressRoute, setAddressRoute] = useState(false);


  const data = [ {address: 'Улица Уральская, д. 7', places: 7},
  {address: 'Улица Мирошниченко, д. 43 А', places: 18},
  {address: 'Улица Петри Ибери, д. 24', places: 0}

]

  console.log(places, street);

  function onClick(event) {
    console.log(event.target.textContent);
    setStreet(event.target.textContent);
    data.forEach(item => {
      if (item.address == event.target.textContent) {
        setPlaces(item.places);
      }
    })
  }

  
  return (
    <Routes>
          <Route exact path="/" element={<StartPage />} />
            
          <Route path="start" element={<Main addressRoute={addressRoute} />} />
          
          <Route path="address" element={<><Main addressRoute={addressRoute}/> <Address street={street} places={places} /></>} />
          <Route path="popup" element={<Popup setAddressRoute={setAddressRoute} onClick={onClick} data={data} />} />


          {/*<Route path="/saved-movies">
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/signup">
            <Register />
          </Route>
          <Route path="/signin">
            <Login />
  </Route>*/}
  </Routes>
   /* <>

    <Main />
    <Footer />

    <Popup />
</>*/
  );
}

export default App;
