import './components/style/app.css';
import { useEffect } from 'react';
import Logo from './assets/ms.jpeg';
import { FaPhoneAlt, FaMailBulk } from 'react-icons/fa';
import { firestore } from './firebase/Firebase';
import PropiedadItem from './components/UI/PropiedadItem';

function App() {

  useEffect(() => {
    firestore.collection('contacts').get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        console.log(doc.data());
      });
    });

  }, []);


  return (
    <>
      <header className="header">
        <div className="topPart">
          <img src={Logo} alt="logotipo" className="logotipo" />
          <div className="rightPart">
            <a href="tel:9983688849"><FaPhoneAlt className="icono"></FaPhoneAlt>9983688849</a>
            <a href="mailto:mcsd1969@gmail.com"><FaMailBulk className="icono"></FaMailBulk>mcsd1969@gmail.com</a>
          </div>
        </div>

        <div className="topMenu">

        </div>

        <div className="searcher">
          <div className="categorySearcher">
            <h1 className="category selected">Todos</h1>
            <h1 className="category">Venta</h1>
            <h1 className="category">Renta</h1>
            <h1 className="category">Renta Vacacional</h1>
          </div>
          <form action="">
            <div className="gridSearcher">
              <label htmlFor="typeSelector" className="labelSearcher">Tipo</label>
              <label htmlFor="ubicationSelector" className="labelSearcher">Ubicación</label>
              <label htmlFor=""></label>
              <select className="selectorSearcher" name="typeSelector" id="typeSelector">
                <option value="">Casa</option>
                <option value="">Departamento</option>
                <option value="">Terreno</option>
              </select>
              <select className="selectorSearcher" name="ubicationSelector" id="ubicationSelector">
                <option value="">Pachuca</option>
                <option value="">Mérida</option>
                <option value="">Cancún</option>
              </select>
              <input className="btnSearcher" type="submit" value="Buscar" />
            </div>
          </form>
        </div>
      </header>

      <div className="contentHouses">
        <PropiedadItem />
        <PropiedadItem />
        <PropiedadItem />
        <PropiedadItem />
        <PropiedadItem />
        <PropiedadItem />
        <PropiedadItem />
      </div>
    </>
  );
}


export default App;
