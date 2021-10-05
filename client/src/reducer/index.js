const initialState = {
  allDogs: [], //copia del estado q siempre va a tener todos los dogs
  dogs: [],
  temps: []
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
            var temp = dogsF[i].temperament;
            if (temp.includes(action.payload)) {
              tempFilter.push(dogsF[i]);
            }
          }
        }
      }
      return {
        ...state,
        dogs: tempFilter, //guardo los dogs filtrados en el estado filtrado, no toco allDogs
      };

    case "FILTER-BY-CREATED":
      const dogsC = state.allDogs;
      var createdFilter = [];

      if (action.payload === "All") {
        createdFilter = dogsC;
      } else if (action.payload === "razaBD") {
        dogsC.forEach((el) => {
            if(el.hasOwnProperty('createInDb')){
                createdFilter.push(el);
            }
        });       
      } else {
        dogsC.forEach((el) => {
            if(! el.hasOwnProperty('createInDb')){
                createdFilter.push(el);
            }
        });       
      }
      return {
        ...state,
        dogs: createdFilter,
      };

    case "ORDER-BY-NAME":    
      //var orderDogs= [];
      const dogsOr = [...state.dogs];
      //const dogsOr = state.dogs;
      console.log("ORDEN: ", action.payload)

      var ordedDogs= action.payload==='asc' ?
      dogsOr.sort(function (a, b){
          if(a.name > b.name){
              return 1;
          }
          if(b.name > a.name){
              return -1;
          }
          return 0;
      }) :
      dogsOr.sort(function(a, b){
          if(a.name > b.name){
              return -1;
          }
          if(b.name > a.name){
              return 1;
          }
          return 0;
      })
      console.log("ARRAY ORDENADO: ",dogsOr)
      console.log("ESTADO: ", state.dogs)
      return{
          ...state,
          dogs: ordedDogs
      };
    

    //   if(action.payload ==="asc"){
    //       console.log("ENTROOOOOOO x ASC?")
    //     orderDogs= state.dogs.sort(function (a, b) {
    //         if (a.name > b.name) return 1;
    //         if (a.name < b.name) return -1;
    //         return 0; // a must be equal to b
    //       });
    //   } else{
    //     console.log("ENTROOOOOOO XDESC?")
    //     orderDogs=state.dogs.sort(function (a, b) {
    //         if (a.name > b.name) return 1;
    //         if (a.name < b.name) return -1;
    //         return 0; // a must be equal to b
    //       });
    //   }
    //   console.log("SALIIIII?")
    //   console.log("Listado:", orderDogs)
    //   return{
    //       ...state,
    //       dogs: orderDogs
    //   }


    default:
      return state;
  }
}

export default rootReducer;
