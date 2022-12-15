import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DAO from "../components/logic/DAO";
import "../components/style/propiedadProfile.css";
import ImageGallery from "react-image-gallery";
import { Link } from "react-router-dom";
import { TbBath, TbBed, TbCar, TbToiletPaper } from "react-icons/tb";
import { BsHouseDoor, BsBricks, BsCalendarDate } from "react-icons/bs";

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
          <div className="propiedad-header"></div>
          <div className="propiedad-body">
            <div className="propiedad-photos">
              <div className="propiedad-photos-container">
                <ImageGallery
                  autoPlay={false}
                  items={propiedad.Imagenes.map((v) => {
                    return { original: v, thumbnail: v, originalHeight: 500 };
                  })}
                  thumbnailPosition="right"
                  // items={new Array(20).fill({ original: propiedad.Imagenes[0], thumbnail: propiedad.Imagenes[0], originalHeight: 500 })}
                  showPlayButton={false}
                  showFullscreenButton={false}
                />
              </div>

              <div className="propiedad-photos-footer"></div>
            </div>

            <div className="propiedad-info">
              <div className="propiedad-title">
                <h1 className="title-profile">{propiedad.Titulo}</h1>
                <h2 className="status-profile">{propiedad.Status}</h2>
              </div>

              <div className="propiedad-price">
                <h2 className="price-profile">
                  ${Number(propiedad.Precio).toLocaleString("en")}
                </h2>
              </div>

              <div className="portada-banner-profile">
                <div className="features-banner-profile">
                  <TbBed className="icon-ficha" />
                  <TbBath className="icon-ficha" />
                  <TbToiletPaper className="icon-ficha" />
                  <TbCar className="icon-ficha" />
                  <BsHouseDoor className="icon-ficha" />
                  <p className="green-profile feature-ficha">
                    {propiedad.Cuartos}
                  </p>
                  <p className="green-profile feature-ficha">
                    {propiedad.Banos}
                  </p>
                  <p className="green-profile feature-ficha">
                    {propiedad.MediosBanos}
                  </p>
                  <p className="green-profile feature-ficha">
                    {propiedad.Estacionamientos}
                  </p>
                  <p className="green-profile feature-ficha">
                    {propiedad.Terreno}㎡
                  </p>
                </div>
              </div>

              <div className="propiedad-info-container">
                <div className="propiedad-info-item">
                  <h2 className="subtitle-profile">Descripción</h2>
                  <p className="text-profile">{propiedad.Descripcion}</p>
                </div>
                <div className="propiedad-info-item">
                  <h2 className="subtitle-profile">Características</h2>
                  {propiedad.Caracteristicas &&
                    propiedad.Caracteristicas.map((caracteristica) => {
                      return (
                        <p className="text-profile">-{caracteristica}</p>
                      );
                    })}
                </div>
                <div className="propiedad-info-item">
                  <h2 className="subtitle-profile">Ubicación</h2>
                  <p className="text-profile">{propiedad.Ubicacion}</p>
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
