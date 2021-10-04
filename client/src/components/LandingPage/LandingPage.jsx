import React from 'react';
import {Link} from 'react-router-dom';
import styles from './LandingPage.module.css';
import Home from '../Home/Home.jsx';


//ACA DEBERIA CARGAR IMAGEN DE FONDO, ETC//
export default function LandingPage(){

    return(
        <div className={styles.lp}>
            <h1>Razas de Perros</h1>
            <h2> Bienvenidos </h2>
            <Link to = '/home'>
                <button >Ingresar</button>
            </Link>
        </div>
    )
}