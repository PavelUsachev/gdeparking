import { useNavigate } from 'react-router-dom';
import "./StartPage.css";

import logo from '../../img/logo.svg';

function StartPage() {
  const history = useNavigate();
  function goToStart() {
    history('/start');
  }

  setTimeout(goToStart, 5000);
  return (
    <main className="start">
      <img className="start__logo" src={logo} alt="Где паркинг"/>
      <div className="loader"></div>
    </main>
  );
}

export default StartPage;
