import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDogDetail } from "../../actions";

import Styles from "./Dog_Detail.module.css";


export default function DogDetail() { //renderiza la card detallada de una raza
  const { id } = useParams();//-->la obtengo con este hook, porqyue en el rout de mi App le especifico "/dogDetail/:id"

  //console.log("ID DEL DOG: ", id);
  const dispatch = useDispatch();

  useEffect(() => { //llena el estado Detail despachando esa fc=> el estado es 1 solo obj
    dispatch(getDogDetail(id));
  }, [dispatch]);

  const myDog = useSelector((state) => state.detail); //traigo el estado detail

  
  return (
    <div className={Styles.divgral}>
      {myDog ? (
        <div id="conteinerGrid" className={Styles.conteinerGrid}>
          <div id="1° columna">          
            <h1 className={Styles.raza}>{myDog.name}</h1>

            {myDog.image ? (
              <img
                className={Styles.imagen}
                src={myDog.image}
                alt="imagen API no encontrada"
              ></img>
            ) : <h3>"no encontrada"</h3>}           
          </div>

          <div id="2°columna">

            <Link  to="/home">
              <button className={Styles.volver}>Volver</button>
            </Link>
           
            <h3 className={Styles.peso}>Peso: {myDog.weight} Kgs </h3>
            
            <h3 className={`${Styles.peso} ${Styles.altura}`}>Altura: {myDog.height} cm </h3>
            
            <h3 className={`${Styles.peso} ${Styles.vida}`}>Prom. de vida: {myDog.life_span}</h3>
            
            <h3 className={`${Styles.peso} ${Styles.temperamentos}`}>{myDog.temperament}</h3>
           
          </div>
          
        </div>
      ) : (
        <h3>"No se encontró esa raza"</h3>
      )}
    </div>
  );
}
