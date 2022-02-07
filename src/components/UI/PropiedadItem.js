import React from 'react'
import Casa from '../../assets/stock1.jpeg'
import '../style/propiedadItem.css'

const PropiedadItem = () => {
    return (
        <div className="ItemContainer">
            <div className="Letrero">Disponible</div>
            <img className="Foto" src={Casa} alt="foto de muestra" />
            <div className="Texto">
                <p className="Titulo" >Casa en Jardines del Sur</p>
                <p className="Precio">$2,000,000</p>
                <p className="Subtitulo">Hermosa casa en zona de alta plusvalia</p>
                <div className="DivCaracteristicas">
                    <p className="Direccion">Osa mayor #9, Jardines del sur IV</p>
                    <div className="CaracteristicasNumericas">
                        <p className="Caracteristica">3</p>
                        <p className="Caracteristica">3</p>
                        <p className="Caracteristica">140</p>
                        <p className="Caracteristica">Cuartos</p>
                        <p className="Caracteristica">Baños</p>
                        <p className="Caracteristica">Mt²</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PropiedadItem
