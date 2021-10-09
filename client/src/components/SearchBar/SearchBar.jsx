import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../../actions";
import Styles from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    console.log(name);
    setName(e.target.value);
  }

  function handleSubmit(e) {
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
