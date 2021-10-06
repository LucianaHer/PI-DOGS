import React from 'react'
import { Link } from "react-router-dom";
import Styles from './OneDog.module.css'

export default function OneDog({name, temperament, image, weight}) {
    return (
        <div className= {Styles.card}>
            <h3>{name}</h3>
            <h5>{temperament}</h5>
            <Link to= '/'> {/* aca iria DogDetail */}
                <img className={Styles.img} src={image} alt="imagen no encontrada" ></img>
            </Link>
            <h4> Peso: {weight} Kgs</h4>
            
        </div>
    )
}


