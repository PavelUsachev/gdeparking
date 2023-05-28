import "./NumberParking.css";

import pin from "../../img/pin.png";

function NumberParking({ data }) {
  const roundClass = `lights__round ${data.zones?.length === 0 ? "red" : ""}`;

  return (
    <>
      <div className="lights">
        <p className={roundClass}>{data.zones?.length}</p>
      </div>

      <div className="street">
        <img className={"street__pin"} src={pin} alt="Месторасположение" />
        <p className="street__name">{data?.address}</p>
      </div>
    </>
  );
}

export default NumberParking;
