import { useEffect } from "react";
import "./ParkingPlace.css";
import { getCamera } from "../../store/camera.js";
import { useParams } from "react-router-dom";
import Main from "../Main/Main";
import { useSelector } from "react-redux";

export const ParkingPlace = () => {
  const id = useParams();

  const data = useSelector((state) => state.camera.camera);

  useEffect(() => {
    getCamera(id);
  }, []);

  return <Main data={data} />;
};
