import React from "react";
import { Link } from "react-router-dom";
import Styles from "./OneDog.module.css";

export default function OneDog({id, name, temperament, image, weight }) {
  return (
    <div className={Styles.card}>
      <Link to={`/dogDetail/${id}`} >
        {/* aca iria DogDetail */}
        <h3>{name}</h3>
      </Link>
      <h5>{temperament}</h5>
      <img className={Styles.img} src={image} alt="imagen no encontrada"></img>
      <h4> Peso: {weight} Kgs</h4>
    </div>
  );
}
