import { Link } from 'react-router-dom';
import "./NotFound.css";

import cars from '../../img/cars.png';

function NotFound() {
  return (
    <main className="main404">
        <h2 className="main404__title top">Ошибка</h2>
        <span className="main404__title num">404</span>
        <img className="main404__img" alt="Машинки" src={cars} />
        <Link to='/start' className="main404__button">На главную</Link>
    </main>
  );
}

export default NotFound;
