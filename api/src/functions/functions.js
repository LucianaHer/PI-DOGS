


const getInfoAPI = async () => {  // Fc para obtener todas las razas de la API
    try {
        
        const urlApi= await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`);
        
        const infoApi = urlApi.data.map(el => {
            return {
                id: el.id,
                name: el.name,
                altura: el.height.metric,
                image: el.image.url,
                vida: el.life_span,
                temperament: el.temperament,
                peso: el.weight.metric,
                origen: el.origin
            }
        })
        return infoApi;

    } catch (e) {
        return('No se pudo conectar a la API',e)
    }    
}

const getDBInfo = async () => {     // fc para obtener todos las razas de la B Datos, junto con los temperamentos
    try {      
        const dogsDB =  await Dog.findAll({
            include: Temperament
        });
        
        const dbDatos=dogsDB.map(d => d.dataValues);
        console.log('DBINFO2', dbDatos)
        return dbDatos;    //(obtener solo el DataValue de cada obj de dogsDB(desde el front?) )
    } catch (e) {
        return('No se pudo acceder a la BD',e)        
    }
}

const getAllData = async () => {
    try {
        const apiInfo= await getInfoAPI();
        const dbInfo= await getDBInfo();
        //console.log('info de la bd dog:', dbInfo)
        const allInfo= dbInfo.concat(apiInfo);
        //console.log("JUNTO BD CON API: ", allInfo)
        return allInfo;
        
    } catch (e) {
        return ('error en la obtencion de datos',e)
    }
}

 async function getOneByIdAPI(idRaza){   // funcion que busca una raza x id en la Api

    //var allDogs= await getAllData();
    var allDogs= await getInfoAPI();

    for(var i=0; i< allDogs.length; i++){
        if (allDogs[i].id === Number(idRaza)){
            // let dog={
            //     id: allDogs[i].id,
            //     name: allDogs[i].name,
            //     temperament: allDogs[i].temperament,
            //     image: allDogs[i].image,
            //     altura: allDogs[i].altura,
            //     peso: allDogs[i].peso,
            //     vida: allDogs[i].vida

                
            // }
            // return dog;
            return allDogs[i]
        }
    }        


}async function getOneByIdBD(idRaza){   // Para encontrar un dog en la BD
    var oneDogBD= await Dog.findByPk(idRaza, {
        include: Temperament
    }); 
    //var dbDog=dogsDB.map(d => d.dataValues);
    //console.log("Data del perro:", oneDogBD)
    //console.log("Data del perro:", oneDogBD.dataValues)
    return oneDogBD.dataValues;
}



async function addTemperaments(t, d){    // agrega los temperamentos pasados en el array, al crear un dog
    t=capitalizar(t);
    var [temp, creado]= await Temperament.findOrCreate({
        where: {nameTemp: t}
    })
    await d.addTemperaments(temp); //vincula el perro con el temperamento
    //await temp.addDogs(d); //vincula el temperamento con el perro 
    
}


function capitalizar(str) {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }