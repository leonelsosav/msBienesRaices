import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DAO from "../components/logic/DAO";
import "../components/style/propiedadProfile.css";
import ImageGallery from "react-image-gallery";
import { Link } from "react-router-dom";

const Propiedad = (props) => {
  const [propiedadId, setPropiedadId] = useState(useParams().id);
  const [showVisualizer, setShowVisualizer] = useState(false);
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
      {propiedad.Imagenes ? (
        <div className="propiedad-container">
          <div className="propiedad-header">
            <div className="propiedad-title">
              <h1 className="title-profile">{propiedad.Titulo}</h1>
              <h2 className="subtitle-profile">{propiedad.Status}</h2>
            </div>
            <div className="propiedad-price">
              <h2 className="subtitle-profile">${propiedad.Precio}</h2>
            </div>
          </div>
          <div className="propiedad-body">
            <div className="propiedad-photos">
              <div className="propiedad-photos-container">
                <ImageGallery
                  autoPlay={true}
                  items={propiedad.Imagenes.map((v) => {
                    return { original: v, thumnail: v, originalHeight: 500 };
                  })}
                />
              </div>
            </div>
            <div className="propiedad-info">
              <div className="propiedad-info-container">
                <div className="propiedad-info-item">
                  <h2>Descripción</h2>
                  <p>{propiedad.Descripcion}</p>
                </div>
                <div className="propiedad-info-item">
                  <h2>Características</h2>
                  <p>{propiedad.Caracteristicas}</p>
                </div>
                <div className="propiedad-info-item">
                  <h2>Ubicación</h2>
                  <p>{propiedad.Ubicacion}</p>
                </div>
              </div>
            </div>
            <Link to={"/ficha-tecnica/" + propiedadId}>
              <button className="btn-regresar">Ficha tecnica</button>
            </Link>
          </div>
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </>
  );
};

export default Propiedad;
