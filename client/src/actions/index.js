import axios from 'axios';

export function getDogs(){
    return async function (dispatch){       //ACA SE CONECTA CON EL BACK (get /dogs)
        var json= await axios.get("http://localhost:3001/dogs"); 
        
        return dispatch({
            type: 'GET-DOGS',
            payload: json.data
        })
    }
}

export function getTemperaments(){
    return async function (dispatch){
        var json= await axios.get("http://localhost:3001/temperament");
        return dispatch({
            type: 'GET-TEMPERAMENT',
            payload: json.data
        }) 
    }
}

export function filterByTemperament(payload){ // el payload es el value del select=> un temp de la lista
    console.log(payload)
    return{
        type: 'FILTER-BY-TEMP',
        payload
    }

}