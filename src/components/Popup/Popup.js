import { Link  } from 'react-router-dom';
import "./Popup.css";
import back from '../../img/back.png';

function Popup({clickOnBack, checkedAddress, setAddressRoute, onClick, data}) {  

  const list = data.map(item => {
    console.log(item.coordinates);
    console.log(checkedAddress.coordinates);
    console.log(item.coordinates[0] == checkedAddress.coordinates[0] & item.coordinates[1] == checkedAddress.coordinates[1]);
    const itemClass = `popup__list-item ${item.coordinates[0] == checkedAddress.coordinates[0] & item.coordinates[1] == checkedAddress.coordinates[1] ? 'item-active' : ''}`;
    return (
      <Link key={item.id} to='/address' className={itemClass} onClick={handleClick} >{item.address}</Link>
    )
  });

function handleClick(event) {
  onClick(event);
  setAddressRoute(true);
}

  return (
<div className="popup">
    <Link to='/start' className="popup__btn" onClick={clickOnBack} >
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
