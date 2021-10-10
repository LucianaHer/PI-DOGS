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
        <div id="conteinerGrid" className={Styles.conteinerGrid}>
          <div id="1° columna">
            {/* <div id="Raza"> */}
            <h1 className={Styles.raza}>{myDog.name}</h1>
            {/* </div> */}
            {/* <div id="imagen" > */}
            {myDog.image ? (
              <img
                className={Styles.imagen}
                src={myDog.image}
                alt="imagen API no encontrada"
              ></img>
            ) : (
              <img src={bd_img} alt="imagen BD encontrada"></img>
            )}
            {/* </div> */}
          </div>

          <div id="2°columna">

            <Link  to="/home">
              <button className={Styles.volver}>Volver</button>
            </Link>

            {/* <div id="peso"> */}
            <h3 className={Styles.peso}>Peso: {myDog.weight} Kgs </h3>
            {/* </div> */}
            {/* <div id="altura"> */}
            <h3 className={`${Styles.peso} ${Styles.altura}`}>
              Altura: {myDog.height} cm
            </h3>
            {/* </div> */}
            {/* <div id="vida"> */}
            <h3 className={`${Styles.peso} ${Styles.vida}`}>
              Prom. de vida: {myDog.life_span}{" "}
            </h3>
            {/* </div> */}
            {/* <div id="temperamentos">  */}
            <h3 className={`${Styles.peso} ${Styles.temperamentos}`}>
              {" "}
              {myDog.temperament}
            </h3>
            {/* </div>            */}
          </div>
        </div>
      ) : (
        <h3>"No se encontró esa raza"</h3>
      )}
    </div>
  );
}
