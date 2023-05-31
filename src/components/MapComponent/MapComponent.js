import React from "react";
import {
  YMaps,
  Map,
  Placemark,
  GeolocationControl,
  SearchControl,
} from "@pbe/react-yandex-maps";
import "./MapComponent.css";
import iconMapGreen from "../../img/iconGreen.svg";

function MapComponent({ data }) {
  const apiKey = process.env.REACT_APP_YAMAP_API;

  const centerCoord =
    !data?.zones || data?.zones.length === 0
      ? [55.7522, 37.6156]
      : [data?.zones[0].lat, data?.zones[0].long];

  const mapState = {
    center: centerCoord,
    zoom: 18,
    controls: [],
  };

  return (
    <YMaps query={{ lang: "RU", apikey: apiKey }}>
      <Map id="map" className="map" defaultState={mapState}>
        <GeolocationControl options={{ float: "left" }} />
        {window.location.pathname === `/camera/${data?.id}`
          ? data &&
            data?.zones.map((el) =>
              el.status === 0 ? (
                <Placemark
                  key={el.internal_id}
                  geometry={[el.lat, el.long]}
                  options={{
                    iconLayout: "default#image",
                    iconImageHref: iconMapGreen,
                    iconImageSize: [31, 40],
                  }}
                />
              ) : (
                ""
              )
            )
          : ""}
        {window.location.pathname === `/camera/${data?.id}` ? (
          ""
        ) : (
          <SearchControl
            options={{ float: "right", placeholderContent: "Поиск адреса" }}
          />
        )}
      </Map>
    </YMaps>
  );
}

export default MapComponent;
