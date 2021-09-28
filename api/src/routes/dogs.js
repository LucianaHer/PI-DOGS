var express = require('express');
var router = express.Router();
const axios = require ('axios'); /////

const {
    YOUR_API_KEY
  } = process.env;
  
const { Dog, Temperament } = require('../db');  // me traigo los modelos

const getInfoAPI = async () => {  // Fc para obtener todas las razas de la API
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
}

const getDBInfo = async () => {     // fc para obtener todos las razas de la B Datos, junto con los temperamentos
    const dogsDB =  await Dog.findAll({
        include: Temperament
    });
    return dogsDB;    
}

const getAllData = async () => {
    const apiInfo= await getInfoAPI();
    const dbInfo= await getDBInfo();
    const allInfo= apiInfo.concat(dbInfo);
    return allInfo;
}

//Rutas

router.get('/', async (req,res) =>{
    const {name}= req.query;   // nombre de la raza por query!!!
       
    const allData= await getAllData();
    

    const dataPpal = await allData.map(el => {
        return {
            name: el.name,
            temperament: el.temperament,
            image: el.image
        }
    });
    
    if(name){  // si hay query
        let dogNames = await dataPpal.filter (el => el.name.toLowerCase().includes(name.toLowerCase()));
        if(dogNames.length >0){
            res.json(dogNames);
        }
        else {
            res.status(404).send('No existe ninguna raza que incluya ese nombre')
        }    
    } else{  //si no hay query
        res.json(dataPpal);

    }  
})






module.exports = router;