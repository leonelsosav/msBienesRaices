import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DAO from "../components/logic/DAO";
import "../components/style/sheetStyle.css";

const FichaTecnica = () => {
  const [propiedadId, setPropiedadId] = useState(useParams().id);
  const [propiedad, setPropiedad] = useState({});
  const { getById } = DAO();

  useEffect(() => {
    const retrieveStock = async () => {
      const response = await getById("propiedad", propiedadId);
      console.log(response);
      setPropiedad(response);
    };
    retrieveStock();
  }, []);

  return (
    <>
      {propiedad.Titulo && (
        <div className="sheet">
          <img
            src={propiedad.Imagenes[0]}
            className="portada-ficha"
            alt="imagen de portada"
          />
          <p className="titulo-ficha">{propiedad.Titulo}</p>
          <p className="feature-ficha">{propiedad.Cuartos}</p>
          <p className="feature-ficha">{propiedad.Banos}</p>
          <p className="feature-ficha">{propiedad.MediosBanos}</p>
          <p className="feature-ficha">{propiedad.Estacionamientos}</p>
          <p className="feature-ficha">{propiedad.Construccion}</p>
          <p className="feature-ficha">{propiedad.Terreno}</p>
          <p className="feature-ficha">{propiedad.Antiguedad}</p>
          <p className="titulo-ficha">{propiedad.Titulo}</p>
          <p className="titulo-ficha">{propiedad.Titulo}</p>
          <p className="precio-ficha">{propiedad.Precio}</p>
          <p className="descripcion-ficha">{propiedad.Descripcion}</p>
          {propiedad.Caracteristicas.map((v, idx) => {
            return (
              <p key={idx} className="caracteristicas-ficha">
                {v}
              </p>
            );
          })}
          {propiedad.Imagenes.slice(1).map((v, idx) => {
            return (
              <img
                key={idx}
                src={v}
                className="imagen-ficha"
                alt="imagen de propiedad"
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default FichaTecnica;
