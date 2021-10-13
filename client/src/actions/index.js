import axios from "axios";


//CONECTA CON EL BACK (get /dogs)
export function getDogs() { //trae todos los dogs desde mi Api
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/dogs"); 

      return dispatch({
        type: "GET-DOGS",
        payload: json.data,
      });
    } catch (error) {
      console.log("No se pudieron obtener las razas", error);
    }
  };
}

//CONECTA CON EL BAK (get/temperaments)
export function getTemperaments() { //trae los temps de mi Api
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/temperament");
      return dispatch({
        type: "GET-TEMPERAMENT",
        payload: json.data,
      });
    } catch (error) {
      console.log("No se pudieron obtener los temperamentos", error);
    }
  };
}

//CONECTA CON EL BACK (get /dogs?name=) x query - trae las coincidencias x nombre raza
export function searchByName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/dogs?name=" + name);
      
        return dispatch({
          type: "GET-NAME-DOGS",
          payload: json.data,
        });
    
    } catch (error) {
      console.log("No se pudo obtener la query", error);

    }
  };
}

// CONECTA CON EL BACK (post /dogs) // agrega una nueva raza
export function postDog(payload){ // el payload me llega del form, es el obj a crear en la tabla
  
  return async function (dispatch) {
      
      var json = await axios.post("http://localhost:3001/dogs", payload); //le paso x BODY el obj creado en el form
      // console.log("REGISTRO CREADO: ",json)
      return json;

  };

}

//CONECTA CON EL BACK - busca un dog por id (x params)
export function getDogDetail(id){
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/dogs/" + id);

      return dispatch({
        type: "GET-DOG-DETAIL-ID",
        payload: json.data,
      });
    } catch (error) {
      console.log("No se pudo obtener datos de la raza", error);
    }
  };
}


export function filterByTemperament(payload) {
  // el payload es el value del select=> un temp de la lista
  console.log(payload);
  return {
    type: "FILTER-BY-TEMP",
    payload,
  };
}


export function filterByCreated(payload) {
  // payload es el value del select
  return {
    type: "FILTER-BY-CREATED",
    payload,
  };
}


export function orderByName(payload) {
  // payload es el value de este select(asc/desc)
  return {
    type: "ORDER-BY-NAME",
    payload,
  };
}


export function orderByWeight(payload) {
  //payload es el value de este select
  return {
    type: "ORDER-BY-WEIGHT",
    payload,
  };
}
