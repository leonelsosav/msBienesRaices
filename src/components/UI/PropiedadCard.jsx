import React from "react";
import "../style/propiedadItem.css";
import { IoBed } from "react-icons/io5";
import { MdBathtub, MdHouse } from "react-icons/md";
import { Link } from "react-router-dom";

const PropiedadCard = ({ propiedadDetails }) => {
  return (
    <div className="item-container">
      <Link to={"/propiedad/" + propiedadDetails.id}>
        <div className="status">{propiedadDetails.Status}</div>
        <img
          className="photos"
          src={propiedadDetails.Imagenes[0]}
          alt="foto de muestra"
        />
        <div className="text-container">
          <p className="title">{propiedadDetails.Titulo}</p>
          <p className="price">${propiedadDetails.Precio}</p>
          <div className="features-container">
            <p className="feature right-bar">
              <IoBed className="icon" />
              {propiedadDetails.Cuartos} Cuartos
            </p>
            <p className="feature right-bar">
              <MdBathtub className="icon" />
              {propiedadDetails.Banos} Baños
            </p>
            <p className="feature">
              <MdHouse className="icon" />
              {propiedadDetails.Terreno} mts²
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PropiedadCard;
