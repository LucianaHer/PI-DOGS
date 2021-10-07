var express = require('express');
var router = express.Router();

const { Dog } = require('../db');  // me traigo los modelos


//Todas las fcnes de esta ruta estan en:
const {
    getAllData,
    getOneByIdAPI,
    getOneByIdBD,
    addTemperaments,
    capitalizar} = require ('../functions/functionsDogs.js')


///// RUTA (POST)  /DOGS  
router.post('/', async (req,res) =>{
    var {name, height, weight, life_span, temperaments}= req.body; //!! temperaments es un array
    
    if (!name || !height || !weight){ //campos allowNull: false
        return res.send('faltan datos ')
    }
    name=capitalizar(name);  //fc q capitaliza string
    try{
        const[dog, created]= await Dog.findOrCreate({
            where:{
              name: name,
            },
            defaults:{
                height: height,
                weight: weight,
                life_span: life_span      
            }   
        });
        if ( created===true && temperaments!==undefined){ //se crean los temperaments pasados x body
            temperaments.forEach( te => {
                addTemperaments(te, dog);  //fc q agrega los temps en la tabla Temperament y los asocia al dog
            })   
        }
        res.status(200).send("Raza creada con éxito");  
    }
    catch(e){ 
        res.status(404).send('Error, Raza no creada', e)
    };
});

///  RUTA (GET)  /DOGS   y query ?=name:
router.get('/', async (req,res) =>{  //   RUTA /dogs ( total y x query name)
    const {name}= req.query;   // nombre de la raza por query!!!
       
    const allData= await getAllData();   //fc q devuelve la info de la Api y de la BD concatenada en un array de {}

    const dataPpal = await allData.map(el => {  // para devolver solo la info de la ruta ppal

        if(el.hasOwnProperty('createInDb')){  //si es de la BD
            let tp= el.Temperaments.map( t => t.nameTemp); //convierte los Temps asociados en un array
            return {
                id:el.id,//esto es para control de Postman, poder tomar la id
                name: el.name,
                temperament: tp.join(', '), // muestra el array como string 
                //image: "No existe imágen",
                createInDb: el.createInDb,
                weight: el.weight
            }
        }else{//es de la Api
            //let tpApi= el.temperament.split(',');//convierte el string temperament en un array
            return {    
                id: el.id,
                name: el.name,
                temperament: el.temperament, ///modifique desde .split!!! 
                image: el.image,
                weight: el.weight                
            }
        }
    });
    if(name){  // si hay query
        let dogNames = await dataPpal.filter (el => el.name.toLowerCase().includes(name.toLowerCase()));
        
        if(dogNames.length >0){
            res.status(200).json(dogNames);  //es un arary de las coincidencias
        }
        else {
            res.status(404).send('No existe ninguna raza que incluya ese nombre')
        }    
    } else{  //si no hay query
        res.status(200).json(dataPpal);
    }  
})


//RUTA (GET) /DOGS params idRaza
router.get('/:idRaza', async (req,res)=> {  // ruta para encontrar una raza en particular (el front me manda la id), 
                                            //pero en la Api se puede buscar x nombre(no voy a usar esa busqueda)
    var {idRaza}=req.params;
     
    try {
        if(idRaza.length===36){  // es por que es una id de UUID => de mi bd

            var oneDogBD= await getOneByIdBD(idRaza);  // fc. q busca en la BD un dog x id 
            if(oneDogBD){
                res.status(200).json(oneDogBD);
            }else{
                res.send('Raza no encontrada')
            }
        }else{   // busca en la Api
            var oneDog= await getOneByIdAPI(idRaza); //fc que busca un dog en la Api x id
            if (oneDog){
                res.status(200).json(oneDog);
            }else{
                res.send('Raza no encontrada')
            }
        }    
    } catch (e) {
        res.status(404).send('No se pudo acceder a los datos')
    }
})









module.exports = router;