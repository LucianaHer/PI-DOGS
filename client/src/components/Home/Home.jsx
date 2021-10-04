
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../../actions";
import OneDog from "../OneDog/OneDog.jsx";

//ACA PUEDO HACER UN NAV para las opciones de volver a mostrar las razas,

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);


  useEffect(() => {
    //lo que se va a ejecutar cdo el estado cambie
    dispatch(getDogs());
  }, [dispatch]);

  function handleOnClick(e) {
    e.preventDefault();
    dispatch(getDogs());
  }

  return (
    <div>
      <Link to="/dog"> Crear Nueva Raza</Link>
      <h1>LISTADO DE RAZAS</h1>
      <button onClick={(e) => handleOnClick(e)}>Cargar toda las Razas</button>
      <div>
        {/* aca irian los filtrados: por raza de la api o agregada xnos / por temperamento
                Orden ascendente / descandente de las razas de perro x orden alfabético y por peso
                paginado
                Input para traer razas por nombre */}
        <select>
          <option value="razaT"> Mostrar Todas las razas</option>
          <option value="razaE"> Mostrar Razas Existentes</option>
          <option value="razaC"> Mostrar Razas Creadas</option>
        </select>

        <select>
          <option> Filtrar por Temperamento</option>
        </select>

        <select>
          <option value="a-z"> Orden Alfabético A-Z</option>
          <option value="z-a"> Orden Alfabético Z-A </option>
        </select>

        <select>
          <option> Orden por Peso</option>
        </select>

        <select>
          <option> Mostrar Raza que contenga el Nombre:</option>
        </select>
        {allDogs?.map((el) => {
          return (
            <OneDog
                name={el.name}
                temperament={el.temperament}
                image={el.image}
            />
          );
        })}
      </div>
    </div>
  );
}
