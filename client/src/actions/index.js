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