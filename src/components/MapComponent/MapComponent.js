import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import './MapComponent.css';

function MapComponent({freePlaces, startPlace}) {
  /*const points = [
    [55.9, 37.8],
    [55.95, 37.7],
    [55.8, 37.64],
  ];
  freePlaces.forEach(point => {
    const myPlacemark = new Placemark(point, {
        hintContent: "Место свободно",
        }, {
        iconLayout: 'default#imageWithContent',
        iconImageHref: ../../img/icon.svg,
        // Размеры метки.
        iconImageSize: [30, 30],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-15, -15],
        // Смещение слоя с содержимым относительно слоя с картинкой.
        //iconContentOffset: [15, 15],
        // Макет содержимого.
        })
        Map.geoObjects.add(myPlacemark);

      })*/

    let newPoints;
  if (freePlaces) {
    newPoints = freePlaces.map((item) => {
      return <Placemark key={Math.random()} geometry={item} options={{preset: 'islands#darkGreenAutoIcon'}} />;
    });
}
  return (
    <YMaps>
      <Map id="map" className="map"
        defaultState={{
          center: startPlace.coordinates,
          zoom: startPlace.zoom,
        }}
      >
        {newPoints}
      </Map>

    </YMaps>

  );
}


export default MapComponent;