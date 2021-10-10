import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDogDetail } from "../../actions";
import bd_img from "../../images/perrito3.jpg";
import Styles from "./Dog_Detail.module.css";

export default function DogDetail() {
  const { id } = useParams();

  console.log("ID DEL DOG: ", id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDogDetail(id));
  }, [dispatch]);

  const myDog = useSelector((state) => state.detail);

  
  return (
    <div className={Styles.divgral}>
      {myDog ? (
        <div>
          <h1>RAZA: {myDog.name}</h1>
          {myDog.image ? (
            <img src={myDog.image} alt="imagen API no encontrada"></img>
          ) : (
            <img src={bd_img} alt="imagen BD encontrada"></img>
          )}
          <h2>Temperamento/s: {myDog.temperament}</h2>
          <h3>Peso: {myDog.weight} </h3>
          <h3>Altura: {myDog.height}</h3>
          <h4>Promedio de vida: {myDog.life_span}</h4>
        </div>
      ) : (
        <h3>"No se encontró esa raza"</h3>
      )}
      <Link to="/home">
          <button>Volver</button>
        </Link>
    </div>
  );
}
