import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDogs,
  getTemperaments,
  filterByTemperament,
  filterByCreated,
  orderByName,
  orderByWeight,
} from "../../actions";
import OneDog from "../OneDog/OneDog.jsx";
import Paging from "../Paging/Paging.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Styles from "./Home.module.css";
import bd_img from "../../images/perrito3.jpg";

//ACA PUEDO HACER UN NAV para las opciones de volver a mostrar las razas,

export default function Home() {
  const dispatch = useDispatch();
  //metraigo los Dogs del estado
  var razas = useSelector((state) => state.dogs);
  console.log("ESTADO: ", razas[4]);

  //me traigo los temperamentos del Estado
  const allTemps = useSelector((state) => state.temps);

  //paginado
  const [pagActual, setPagActual] = useState(1);
  const [dogsPorPag, setDogsPorPag] = useState(8);
  const indUltimoDog = pagActual * dogsPorPag;
  const indPrimerDog = indUltimoDog - dogsPorPag;
  const currentDogs = razas.slice(indPrimerDog, indUltimoDog);
  console.log("Dogs por pagina: ", currentDogs);

  const paginado = (nroPag) => {
    setPagActual(nroPag);
  };

  ////////////

  //Para disparar la accion getDogs(), y llenar el Estado con los dogs
  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  //Para disparar la accion getTemps(), y llenar el estado con los temperamentos
  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  //ejecuto esto al presionar 'Cargar todas las razas'
  function handleOnClick(e) {
    e.preventDefault();
    dispatch(getDogs());
  }

  //funcion para tomar el select de temperamentos y despachar la accion de filtrar temp, para renderizar los dogs fitrados
  function handleFilterTemp(event) {
    dispatch(filterByTemperament(event.target.value));
    setPagActual(1);
  }

  //funcion para tomar el select de Razas Creadas / Existentes y despachar la accion filterByCreated
  function handleFilterCreated(e) {
    dispatch(filterByCreated(e.target.value));
    setPagActual(1);
  }

  // funcion para ordenar las razas en orden asc o desc cdo se selecciona el select, y despacha la accion orderByName
  function handleABC(ev) {
    ev.preventDefault();
    dispatch(orderByName(ev.target.value));
    setPagActual(1);
  }

  function handleWeight(e) {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setPagActual(1);
  }


   /* aca irian los filtrados: por raza de la api o agregada xnos / por temperamento
                    Orden ascendente / descandente de las razas de perro x orden alfabético y por peso
                    paginado
                Input para traer razas por nombre */
  return (
    <div className={Styles.divgral}>
      
      <nav className={Styles.nav}>
        <div className={Styles.navIzq}>
          <select className={Styles.select} name="created" onChange={(e) => handleFilterCreated(e)}>
              <option className={Styles.options} value="All" key="3">Todas las razas</option>
              <option className={Styles.options} value="razaApi" key="4">Razas Existentes</option>
              <option className={Styles.options} value="razaBD" key="5">Razas Creadas</option>
            </select>


            <select className={Styles.select} name="abcOrden" onChange={(ev) => handleABC(ev)}>
              <option className={Styles.options} value="all" key="0"> Orden x Nombre Raza</option>
              <option className={Styles.options} value="asc" key="1">Ascendente </option>
              <option className={Styles.options} value="desc" key="2">Descendente Z-A</option>
            </select>

            <select className={Styles.select} name="orderWeight" onChange={(e) => handleWeight(e)}>
              <option className={Styles.options} value="All"> Orden Peso Promedio</option>
              <option className={Styles.options} value="min"> Menor Peso</option>
              <option className={Styles.options} value="max"> Mayor Peso</option>
            </select>

            <select className={Styles.select} name="temps" onChange={(event) => handleFilterTemp(event)}>
              <option className={Styles.options} value="All" key={100}>Temperamentos</option>
              {allTemps.map((t) => (
                <option className={Styles.options} key={t.id} value={t.nameTemp}>{t.nameTemp}</option>
              ))}
            </select>
          </div>

          <div className={Styles.select}>
              <NavLink className={Styles.link} to="/"  > Volver a  Inicio </NavLink>
            </div>

          <div className={Styles.navDer}>
            <div /* className={Styles.select} */>
              <SearchBar />
            </div>
            
            <div className={Styles.select}>
              <NavLink className={Styles.link} to="/newDog"> Crear Nueva Raza</NavLink>
            </div>
            
            
            
            {/* <button onClick={(e) => handleOnClick(e)}>Cargar toda las Razas</button> */}
           
          </div>
      </nav>

        {/*  <h3>LISTADO DE RAZAS</h3> */}
        
        <div >
          <Paging 
            dogsPorPag={dogsPorPag}
            allDogs={razas.length}
            paginado={paginado}
          />
        </div>
        
        <div className={Styles.cards}>
          {currentDogs?.map((el) => {
            return (
              <div>
                <OneDog
                  id={el.id}
                  name={el.name}
                  temperament={el.temperament}
                  //image={el.image}
                  image={el.image ? el.image : bd_img}
                  weight={el.weight}
                />
              </div>
            );
          })}
        </div>


        
      </div>
    
  );
}