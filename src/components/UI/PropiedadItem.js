import React from 'react'
import Casa from '../../assets/casa.jpg'
import '../style/propiedadItem.css'

const PropiedadItem = () => {
    return (
        <div>
            <img src={Casa} alt="foto de muestra" />
            <h1>titulo</h1>
            <h1>$precio</h1>
            <h2>ubicacion</h2>
            <h2>cuartos</h2>
            <h2>baños</h2>
            <h2>terreno</h2>
            <button>Ver mas</button>
        </div>
    )
}

export default PropiedadItem
