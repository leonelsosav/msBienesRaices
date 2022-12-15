import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DAO from "../components/logic/DAO";
import "../components/style/sheetStyle.css";
import { TbBath, TbBed, TbCar, TbToiletPaper } from "react-icons/tb";
import { BsHouseDoor, BsBricks, BsCalendarDate } from "react-icons/bs";

const FichaTecnica = () => {
  const [propiedadId, setPropiedadId] = useState(useParams().id);
  const [propiedad, setPropiedad] = useState({});
  const { getById } = DAO();

  useEffect(() => {
    const retrieveStock = async () => {
      const response = await getById("propiedad", propiedadId);
      setPropiedad(response);
    };
    retrieveStock();
  }, []);

  return (
    <>
      {propiedad.Titulo && (
        <div className="sheet">
          <div className="sheet-workspace">
            <div className="portada-container">
              <img
                src={propiedad.Imagenes[2]}
                className="portada-ficha"
                alt="imagen de portada"
              />
              <div className="portada-banner">
                <p className="titulo-ficha">{propiedad.Titulo}</p>
                <div className="features-banner">
                  <TbBed className="icon-ficha" />
                  <TbBath className="icon-ficha" />
                  <TbToiletPaper className="icon-ficha" />
                  <TbCar className="icon-ficha" />
                  <BsBricks className="icon-ficha" />
                  <BsHouseDoor className="icon-ficha" />
                  <BsCalendarDate className="icon-ficha" />
                  <p className="green feature-ficha">{propiedad.Cuartos}</p>
                  <p className="green feature-ficha">{propiedad.Banos}</p>
                  <p className="green feature-ficha">{propiedad.MediosBanos}</p>
                  <p className="green feature-ficha">
                    {propiedad.Estacionamientos}
                  </p>
                  <p className="green feature-ficha">
                    {propiedad.Construccion}
                  </p>
                  <p className="green feature-ficha">{propiedad.Terreno}</p>
                  <p className="green feature-ficha">
                    {propiedad.Antiguedad +
                      (propiedad.Antiguedad === 1 ? " año" : " años")}
                  </p>
                  <p className="feature-ficha">Recamaras</p>
                  <p className="feature-ficha">Baños</p>
                  <p className="feature-ficha">Medios baños</p>
                  <p className="feature-ficha">Estacionamientos</p>
                  <p className="feature-ficha">M² Construccion</p>
                  <p className="feature-ficha">M² Terreno</p>
                  <p className="feature-ficha">Antiguedad</p>
                </div>
              </div>
            </div>
            <p className="titulo-ficha">{propiedad.Titulo}</p>
            <div className="info-container-ficha">
              <div className="info-ficha-izquierda">
                <p className="precio-ficha-wrapper">Precio:</p>
                <p className="precio-ficha">
                  ${Number(propiedad.Precio).toLocaleString("en")}
                </p>
                <p className="descripcion-ficha">{propiedad.Descripcion}</p>
                {propiedad.Caracteristicas.map((v, idx) => {
                  return (
                    <p key={idx} className="caracteristicas-ficha">
                      -{v}
                    </p>
                  );
                })}
              </div>
              <div className="info-ficha-derecha">
                <img
                  src="https://maps.googleapis.com/maps/api/staticmap?center=21.107832,-86.880015&markers=color:blue%7Clabel:%7C21.107832,-86.880015&zoom=16&size=600x300&maptype=roadmap&key="
                  alt="mapa"
                />
              </div>
            </div>
            <p className="titulo-ficha">Fotos:</p>
            <div className="photos-container">
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
          </div>
        </div>
      )}
    </>
  );
};

export default FichaTecnica;
