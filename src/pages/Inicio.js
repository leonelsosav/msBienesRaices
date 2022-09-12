import "../components/style/app.css";
import { useEffect, useRef, useState } from "react";
import Logo from "../assets/ms.jpeg";
import stock1 from "../assets/stock1.jpeg";
import stock2 from "../assets/stock2.jpeg";
import stock3 from "../assets/stock3.jpeg";
import { FaPhoneAlt, FaMailBulk } from "react-icons/fa";
import DAO from "../components/logic/DAO";
import PropiedadCard from "../components/UI/PropiedadCard";
import { Link } from "react-router-dom";

const Inicio = () => {
  const { getAll } = DAO();
  const stock = useRef(1);
  const [filter, setFilter] = useState("Todos");
  const [tipo, setTipo] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [propiedades, setPropiedades] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      document.getElementsByClassName(
        "initial-background"
      )[0].style.backgroundImage = `url(${
        stock.current === 1 ? stock2 : stock.current === 2 ? stock3 : stock1
      })`;
      stock.current === 1
        ? (stock.current = 2)
        : stock.current === 2
        ? (stock.current = 3)
        : (stock.current = 1);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const retrievePropiedades = async () => {
      const response = await getAll("propiedad");
      console.log(response);
      setPropiedades(response);
    };

    retrievePropiedades();
  }, []);

  useEffect(() => {
    const retrieveStock = async () => {
      const response = await getAll("contacts");
      console.log(response);
    };
    retrieveStock();
    console.log(tipo);
    console.log(ubicacion);
  }, [tipo, ubicacion]);

  return (
    <>
      <div className="initial-background">
        <header className="header">
          <div className="top-part">
            <img src={Logo} alt="logotipo" className="logotipo" />
            <div className="right-part">
              <a href="tel:9983688849">
                <FaPhoneAlt className="icono"></FaPhoneAlt>9983688849
              </a>
              <a href="mailto:mcsd1969@gmail.com">
                <FaMailBulk className="icono"></FaMailBulk>mcsd1969@gmail.com
              </a>
            </div>
          </div>

          <div className="searcher">
            <div className="category-searcher">
              <h1
                onClick={() => setFilter("Todos")}
                className={"category" + (filter === "Todos" ? " selected" : "")}
              >
                Todos
              </h1>
              <h1
                onClick={() => setFilter("Venta")}
                className={"category" + (filter === "Venta" ? " selected" : "")}
              >
                Venta
              </h1>
              <h1
                onClick={() => setFilter("Renta")}
                className={"category" + (filter === "Renta" ? " selected" : "")}
              >
                Renta
              </h1>
              <h1
                onClick={() => setFilter("Renta Vacacional")}
                className={
                  "category" +
                  (filter === "Renta Vacacional" ? " selected" : "")
                }
              >
                Renta Vacacional
              </h1>
            </div>
            <form action="">
              <div className="grid-searcher">
                <label htmlFor="typeSelector" className="label-searcher">
                  Tipo
                </label>
                <label htmlFor="ubicationSelector" className="label-searcher">
                  Ubicación
                </label>
                <label htmlFor=""></label>
                <select
                  onChange={(e) => setTipo(e.target.value)}
                  className="selector-searcher"
                  name="typeSelector"
                  id="typeSelector"
                >
                  <option value="Casa">Casa</option>
                  <option value="Departamento">Departamento</option>
                  <option value="Terreno">Terreno</option>
                </select>
                <select
                  onChange={(e) => setUbicacion(e.target.value)}
                  className="selector-searcher"
                  name="ubicationSelector"
                  id="ubicationSelector"
                >
                  <option value="Pachuca">Pachuca</option>
                  <option value="Mérida">Mérida</option>
                  <option value="Cancún">Cancún</option>
                </select>
                <input className="btn-searcher" type="submit" value="Buscar" />
              </div>
            </form>
          </div>
        </header>
      </div>

      <p className="featured">Propiedades destacadas</p>
      <div className="content-houses">
        {propiedades.length > 0 &&
          propiedades.map((propiedad, idx) => {
            return <PropiedadCard key={idx} propiedadDetails={propiedad} />;
          })}
      </div>
      <Link to="/registrar-propiedad">
        <button className="btn-regresar">Registrar propiedades</button>
      </Link>
    </>
  );
};

export default Inicio;
