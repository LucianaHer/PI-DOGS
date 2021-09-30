var express = require('express');
var router = express.Router();
const axios = require ('axios'); /////

const {
    YOUR_API_KEY
  } = process.env;
  
const { Dog, Temperament } = require('../db');  // me traigo los modelos

///////FUNCIONES////////////////////////////
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
       // console.log('DBINFO', dogsDB)
        const dbDatos=dogsDB.map(d => d.dataValues);
        //console.log('DBINFO2', dbDatos)
        return dbDatos;    //(obtener solo el DataValue de cada obj de dogsDB(desde el front?) )
    } catch (e) {
        return('No se pudo acceder a la BD',e)        
    }
}

const getAllData = async () => {
    try {
        const apiInfo= await getInfoAPI();
        const dbInfo= await getDBInfo();
        console.log('info de la bd dog:', dbInfo)
        const allInfo= dbInfo.concat(apiInfo);
        //console.log("JUNTO BD CON API: ", allInfo)
        return allInfo;
        
    } catch (e) {
        return ('error en la obtencion de datos',e)
    }
}

 async function getOneDogById(idRaza){   // funcion que busca una raza x id

    var oneDog={};
    var allDogs= await getAllData();
    
    for(var i=0; i< allDogs.length; i++){
        if (allDogs[i].id === Number(idRaza)){
            let dog={
                id: allDogs[i].id,
                name: allDogs[i].name,
                temperament: allDogs[i].temperament,
                image: allDogs[i].image,
                altura: allDogs[i].altura,
                peso: allDogs[i].peso,
                vida: allDogs[i].vida
            }
            return dog;
        }
    }        

}

async function addTemperaments(t, d){    // agrega los temperamentos pasados en el array, al crear un dog
    var [temp, creado]= await Temperament.findOrCreate({
        where: {nameTemp: t}
    })
    await d.addTemperaments(temp); //vincula el perro con el temperamento
    await temp.addDogs(d); //vincula el temperamento con el perro 
       
}

////////////RUTAS////////////////////////
/* {
    "nombre": "Coker",
    "altura": "40",
    "peso": "18",
    "años": "11"

} */

router.post('/', async (req,res) =>{
    const {nombre, altura, peso, años, temperaments}= req.body; //!! temperaments es un array
    
    if (!nombre || !altura || !peso){
        return res.send('faltan datos ')
    }
    try{
        const[dog, created]= await Dog.findOrCreate({
            where:{
              name: nombre,
            },
            defaults:{
                height: altura,
                weight: peso,
                life_span: años      
            }   
        });
        if ( created===true && temperaments!==undefined){
            temperaments.forEach( te => {
            addTemperaments(te, dog);
            })   
        }
        res.json(dog);
    }
    catch(e){ 
        res.status(404).send('No creado')
    };
});


router.get('/', async (req,res) =>{  //   RUTA /dogs ( total y x query name)
    const {name}= req.query;   // nombre de la raza por query!!!
       
    const allData= await getAllData();   

    const dataPpal = await allData.map(el => {  // para devolver solo la info de la ruta ppal

        if(el.hasOwnProperty('createInDb')){
            let tp= el.Temperaments.map( t => t.nameTemp);
            return {
                name: el.name,
                temperament: tp.join(', '),
                image: "No existe imágen"
            }
        }else{
            return {    
    
                name: el.name,
                temperament: el.temperament,
                image: el.image
            }
        }
    });
    if(name){  // si hay query
        //console.log("entro acccaaaaaaaaa", name);
        let dogNames = await dataPpal.filter (el => el.name.toLowerCase().includes(name.toLowerCase()));
        
        if(dogNames.length >0){
            res.json(dogNames);
        }
        else {
            res.status(404).send('No existe ninguna raza que incluya ese nombre')
        }    
    } else{  //si no hay query
        console.log('PERRRO -ID:',dataPpal[0].id)
        res.json(dataPpal);

    }  
    
})

router.get('/:idRaza', async (req,res)=> {  // ruta para encontrar una raza en particular (el front me manda la id), 
                                            //pero en la Api se puede buscar x nombre(no voy a usar esa busqueda)
    const {idRaza}=req.params;
    
    try {
        var oneDog= await getOneDogById(idRaza);
        console.log(oneDog)
        if (oneDog){
            res.json(oneDog);
        }else {
            res.send('Raza no encontrada')
        }      
    } catch (e) {
        res.status(404).send('No se pudo acceder a los datos')
    }
})









module.exports = router;