import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../../actions";
import Styles from "./SearchBar.module.css";

export default function SearchBar() { //busqueda de raza x name (es un includes en el back)

  const dispatch = useDispatch();
  const [name, setName] = useState(""); //est local para q valla renderizando  el input (name)

  function handleInputChange(e) {//cdo hay un cambio en el input, lo va renderizando
    e.preventDefault();
    console.log(name);
    setName(e.target.value);
  }

  function handleSubmit(e) {// cdo se presiona Buscar, se despacha la accion p/ buscar en la api x name
    e.preventDefault();
    dispatch(searchByName(name));
    setName("");
  }

  return (
    <form className={Styles.formul}  onSubmit={(e) => handleSubmit(e)}>
      <input
        className={Styles.input}
        type="text"
        placeholder=" Ingrese raza..."
        value={name}
        onChange={(e) => handleInputChange(e)}
      />
      <input className={Styles.boton} type="submit" value="Buscar" />
    </form>
  );
}
