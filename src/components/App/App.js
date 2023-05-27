import { Route, Routes, useNavigate } from "react-router-dom";
import React from "react";
import "./App.css";

import Main from "../Main/Main";
import StartPage from "../StartPage/StartPage";
import Address from "../Address/Address";
import Popup from "../Popup/Popup.js";
import NotFound from "../NotFound/NotFound";
import { ParkingPlace } from "../ParkingPlace/ParkingPlace";

function App() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/start" element={<Main />} />
      <Route
        path="/address"
        element={
          <>
            <Main />
            <Address />
          </>
        }
      />
      <Route path="/popup" element={<Popup />} />
      <Route path="/camera/:id" element={<ParkingPlace />} />
      <Route exact path="/" element={<StartPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
