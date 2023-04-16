import { Link  } from 'react-router-dom';
import "./Popup.css";
import back from '../../img/back.png';

function Popup({setAddressRoute, onClick, data}) {  
  console.log(data)

  const list = data.map(item => {
    return (
      <Link key={Math.random()} to='/address' className="popup__list-item" onClick={handleClick} >{item.address}</Link>
    )
  });

function handleClick(event) {
  onClick(event);
  setAddressRoute(true);
}

  return (
<div className="popup">
    <Link to='/start' className="popup__btn">
        <img className="popup__btn-logo" src={back} alt="Стрелка назад"/>
        <span className="popup__btn-text">Назад</span>
    </Link>
    <nav className="popup__list">
        {list}
    </nav>
    <button className="popup__add-adress">Добавить новый</button>
</div>
  );
}

export default Popup;
