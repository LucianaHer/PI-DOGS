import React from "react";
import Styles from "./Paging.module.css"

//Componente que renderiza los Nros de paginas para navegar
export default function Paging({ dogsPorPag, allDogs, paginado }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allDogs / dogsPorPag); i++) {
    pageNumbers.push(i); // tiene la cant de paginas que necesito mapear
  
  }
  return (
    <div >
       <ul className={Styles.ul}> 
        {pageNumbers && 
        pageNumbers.map(number => (  //mapea cada numerito de la cant de pag( c/nrito=> pag de 8 cards)
           <li  className={Styles.li} key={number}> 
             <a classNAme={Styles.a}  onClick={() => paginado(number)}> {number} </a>
           </li> 
        ))}
       </ul> 
    </div>
  );
}
