import axios from "axios";

export function getDogs() {
  return async function (dispatch) {
    //ACA SE CONECTA CON EL BACK (get /dogs)
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
export function getTemperaments() {
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

//CONECTA CON EL BACK (get /dogs?name=)
export function searchByName(name) {
  return async function (dispatch) {
    //ACA SE CONECTA CON EL BACK (get /dogs)
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
  return {
    type: "ORDER-BY-WEIGHT",
    payload,
  };
}
