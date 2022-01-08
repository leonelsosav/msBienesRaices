import React from 'react'
import Casa from '../../assets/casa.jpg'
import '../style/propiedadItem.css'

const PropiedadItem = () => {
    return (
        <div className="ItemContainer">
            <img className="Foto" src={Casa} alt="foto de muestra" />
            <h1 className="Titulo" >titulo</h1>
            <h1 className="Precio">$precio</h1>
            <h2 className="Caracteristica">ubicacion</h2>
            <h2 className="Caracteristica">cuartos</h2>
            <h2 className="Caracteristica">baños</h2>
            <h2 className="Caracteristica">terreno</h2>
            <button>Ver mas</button>
        </div>
    )
}

export default PropiedadItem
