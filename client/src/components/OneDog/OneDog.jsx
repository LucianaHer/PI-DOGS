import React from "react";
import { Link } from "react-router-dom";
import Styles from "./OneDog.module.css";

export default function OneDog({ id, name, temperament, image, weight }) {
  if(!id){
    return(
    // <div className={Styles.card}>
      
        <h3 className={Styles.error}>NO HAY COINCIDENCIA</h3>
      
    // </div>
    )
  }else{

    //RENDERIZA CADA CARD// tiene link p/rendeizar <DogDetail/> desde la ruta /dogDetail, aca le paso el param(id) a la ruta,
    //<DogDetail/> es quien despacha la accion de buscar esa id en la api x params
    return (
      <div className={Styles.card}>
        <Link className={Styles.name} to={`/dogDetail/${id}`}>
          <h3>{name}</h3>
        </Link>

        <h5 className={Styles.text}>{temperament}</h5>
        <Link to={`/dogDetail/${id}`}>
          <img
            className={Styles.img}
            src={image}
            alt="imagen no encontrada"
          ></img>
        </Link>

        <h4 className={Styles.text}> Peso: {weight} Kgs</h4>
        {/* <h5 className={Styles.click}>click en foto</h5> */}
      </div>
    );
    }
}
