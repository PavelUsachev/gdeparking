import "./Address.css";

import pin from '../../img/pin.png';

function Address({place}) {
  console.log(place);
  const roundClass = `lights__round ${place.freePlaces.length === 0 ? 'red' : ''}`;
  return (
    <>
   <div className="lights">
            <p className={roundClass}>{place.freePlaces.length === 0 ? '' : place.freePlaces.length}</p>
        </div>

        <div className="street">
            <img className={"street__pin"} src={pin} alt="Месторасположение"/>
            <p className="street__name">{place.address}</p>
        </div>
  </>
  );
}

export default Address;
