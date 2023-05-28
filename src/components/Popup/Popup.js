import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Popup.css";
import back from "../../img/back.png";
import { useDispatch, useSelector } from "react-redux";
import { getCamera, getCameras } from "../../store/camera.js";

function Popup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cameraAll = useSelector((state) => state?.camera?.cameras);

  function handleClick(evt, id) {
    dispatch(getCamera(id));
    navigate(`/camera/${id}`);
  }

  const clickOnBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getCameras());
  }, []);

  return (
    <div className="popup">
      <div className="popup__btn" onClick={clickOnBack}>
        <img className="popup__btn-logo" src={back} alt="Стрелка назад" />
        <span className="popup__btn-text">Назад</span>
      </div>
      {cameraAll ? (
        cameraAll.map((item) => {
          return (
            <div
              key={item.id}
              className="popup__list-item"
              onClick={(evt) => handleClick(evt, item.id)}
            >
              {item.address}
            </div>
          );
        })
      ) : (
        <p className="popup__text">Нет адресов</p>
      )}
      <button className="popup__add-adress">Добавить новый</button>
    </div>
  );
}

export default Popup;
