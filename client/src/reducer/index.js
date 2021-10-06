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
          if (el.hasOwnProperty("createInDb")) {
            createdFilter.push(el);
          }
        });
      } else {
        dogsC.forEach((el) => {
          if (!el.hasOwnProperty("createInDb")) {
            createdFilter.push(el);
          }
        });
      }
      return {
        ...state,
        dogs: createdFilter,
      };

    case "ORDER-BY-NAME":
      const dogsOr = [...state.dogs];

      var ordedDogs =
        action.payload === "asc"
          ? dogsOr.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : dogsOr.sort(function (a, b) {
              //desc
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: ordedDogs,
      };

    case "ORDER-BY-WEIGHT":
      var dogsW = [...state.dogs];
      var dogsW2 = [];
      var pesoMin = 0;
      var pesoMax = 0;

      for (let i = 0; i < dogsW.length; i++) {
        console.log(" peso del dog:", dogsW[i].weight, typeof dogsW[i].weight);
        var peso = dogsW[i].weight.split("-"); //array
        console.log(" peso del dog Array", peso);
  
        if (dogsW[i].weight === "NaN" ) { //p/setar
          dogsW[i].pmin = 100;
        } else {
          dogsW[i].pmin = parseInt(peso[0].trim());
        }
        if(peso.length >1){
            
            // if(dogsW[i].pmin ==="NaN"){
            //   dogsW[i].pmin= parseInt(peso[1].trim());
            // }
            dogsW[i].pmax=parseInt(peso[1].trim());
            //dogsW[i].peso_prom=(pesoMin+pesoMax)/2;
        }else{
          dogsW[i].pmax= dogsW[i].pmin
        }
      }

      if (action.payload === "min") {
        dogsW.sort(function (a, b) {
          //return a.pmin - b.pmin; //por menor del peso min
          return ((a.pmin + a.pmax)/2) - ((b.pmin + b.pmax)/2);//xpromedio
        });

      } else if (action.payload === "max") {
        dogsW.sort(function (a, b) {
          //return b.pmax - a.pmax;//por mayor del peso max
          return ((b.pmin + b.pmax)/2) - ((a.pmin + a.pmax)/2);//por promedio
        });
      }
      return {
        ...state,
        dogs: dogsW,
      };

    default:
      return state;
  }
}

export default rootReducer;
