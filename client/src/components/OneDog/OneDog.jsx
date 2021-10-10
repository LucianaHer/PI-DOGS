import React from "react";
import { Link } from "react-router-dom";
import Styles from "./OneDog.module.css";

export default function OneDog({ id, name, temperament, image, weight }) {
  return (
    <div className={Styles.card}>
      <Link className={Styles.name} to={`/dogDetail/${id}`}>
        {/* aca iria DogDetail */}
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
    </div>
  );
}
