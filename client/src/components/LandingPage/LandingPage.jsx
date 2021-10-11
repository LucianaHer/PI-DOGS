import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
import hueso from "../../images/hueso.png";
// import patern from "../../images/patern3.jpg";

//ACA DEBERIA CARGAR IMAGEN DE FONDO, ETC//
export default function LandingPage() {
  return (
    <div className={styles.lp}>
      <div className={styles.patern}>
        {/* <img src={patern} alt="" /> */}
        <div>
          <span className={styles.title}>Razas de Perros</span>
        </div>
        <div>
          <span className={styles.bienvenidos}> Bienvenidos!</span>
        </div>
        {/* <img src={imLP} alt="" /> */}
        <form>
          <Link to="/home">
            <input className={styles.botonIm} type="image" src={hueso} />
          </Link>
        </form>
      </div>
    </div>
  );
}
