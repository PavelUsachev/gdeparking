import { Route, Routes } from "react-router-dom";
import React from "react";
import "./App.css";
import Main from "../Main/Main";
import StartPage from "../StartPage/StartPage";
import Popup from "../Popup/Popup.js";
import NotFound from "../NotFound/NotFound";
import { ParkingPlace } from "../ParkingPlace/ParkingPlace";

function App() {
  return (
    <Routes>
      <Route path="/start" element={<Main />} />
      <Route path="/popup" element={<Popup />} />
      <Route path="/camera/:id" element={<ParkingPlace />} />
      <Route exact path="/" element={<StartPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
