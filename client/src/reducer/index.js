const initialState = {
  allDogs: [], //copia del estado q siempre va a tener todos los dogs
  dogs: [],
  temps: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET-DOGS":
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload, // aca crea otra copia de dogs, q nunca se va a tocar(p/los filtrados)
      };

    case "GET-TEMPERAMENT":
      return {
        ...state,
        temps: action.payload,
      };

    case "FILTER-BY-TEMP":
      var dogsF = state.allDogs; // siempre me traigo todos los dogs del estado inmutable
      var tempFilter = [];
      if (action.payload === "All") {
        tempFilter = dogsF;
      } else {
        for (let i = 0; i < dogsF.length; i++) {
          if (dogsF[i].temperament) {
            var tempLower = dogsF[i].temperament.toLowerCase();
            if (tempLower.includes(action.payload)) {
              tempFilter.push(dogsF[i]);
            }
          }
        }
      }
      return {
        ...state,
        dogs: tempFilter, //guardo los dogs filtrados en el estado filtrado, no toco allDogs
      };

    default:
      return state;
  }
}

export default rootReducer;
