import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import './MapComponent.css';

function MapComponent() {
  const points = [
    [55.9, 37.8],
    [55.95, 37.7],
    [55.8, 37.64],
  ];
  /* points.forEach(point => {
    const myPlacemark = new ymaps.Placemark(point, {
        hintContent: "Место свободно",
        }, {
        iconLayout: 'default#imageWithContent',
        iconImageHref: './img/icon.svg',
        // Размеры метки.
        iconImageSize: [30, 30],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-15, -15],
        // Смещение слоя с содержимым относительно слоя с картинкой.
        //iconContentOffset: [15, 15],
        // Макет содержимого.
        iconContentLayout: MyIconContentLayout
        })

    myMap.geoObjects.add(myPlacemark);*/
  
  const newPionts = points.map((item) => {
    return <Placemark key={Math.random()} geometry={item}/>;
  });
  return (
    <YMaps>
      <Map id="map" className="map"
        defaultState={{
          center: [55.751574, 37.573856],
          zoom: 10,
        }}
      >
        {newPionts}
      </Map>

    </YMaps>

  );
}


export default MapComponent;