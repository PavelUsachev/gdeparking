import "./NumberParking.css";
import pin from "../../img/pin.png";

function NumberParking({ data }) {
  const roundClass = `lights__round ${data.zones?.length === 0 ? "red" : ""}`;
  const numberParking = data?.zones.filter((item) => item.status === 0);

  return (
    <>
      <div className="lights">
        <p className={roundClass}>{numberParking?.length}</p>
      </div>

      <div className="street">
        <img className={"street__pin"} src={pin} alt="Месторасположение" />
        <p className="street__name">{data?.address}</p>
      </div>
    </>
  );
}

export default NumberParking;
