import "./Address.css";

import pin from '../../img/pin.png';

function Address({street, places}) {
  const roundClass = `lights__round ${places === 0 ? 'red' : ''}`;
 return (
    <>
   <div className="lights">
            <p className={roundClass}>{!places ? '' : places}</p>
        </div>

        <div className="street">
            <img className={"street__pin"} src={pin} alt="Месторасположение"/>
            <p className="street__name">{street}</p>
        </div>
  </>
  );
}

export default Address;
