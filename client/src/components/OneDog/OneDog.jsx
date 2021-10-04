import React from 'react'
import { Link } from "react-router-dom";
import Styles from './OneDog.module.css'

export default function OneDog({name, temperament, image}) {
    return (
        <div className= {Styles.card}>
            <h3>{name}</h3>
            <h4>{temperament}</h4>
            <Link to= '/'> {/* aca iria DogDetail */}
                <img className={Styles.img} src={image} alt="imagen no encontrada" ></img>
            </Link>
            
        </div>
    )
}


