var express = require('express');
var router = express.Router();

const axios = require ('axios'); /////

const {
    YOUR_API_KEY
  } = process.env;
  
const { Temperament } = require('../db');  // me traigo los modelos


const getTempAPI = async () => {  // Fc para obtener todas los temperamentos de la Api
    try {
        
        const urlApi= await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`);
        
        const tempApi = urlApi.data.map(el => el.temperament) //tempApi es una array de strins, cada string tiene varios temperamentos

        var arrayTemp=[];
        var arrayTemp2=[]
        var long= tempApi.length;
        

        for(var i=0; i<long ;i++){
            if(!tempApi[i]) continue;
            let spl= tempApi[i].split(',');   // un spl es un array de temperamentos de cada dog
            for(var j=0; j<spl.length; j++){
                let tNorm=spl[j].trim();//.toLowerCase();
                if(arrayTemp2.includes(tNorm)) continue; // para que no se repitan los temperamentos
                arrayTemp2.push(tNorm);
                arrayTemp.push({nameTemp: tNorm});
            }
        }
        return arrayTemp;
    } catch (e) {
        return('No se pudo conectar a la API',e)
    }    
}
////////////////////////////////////

router.get('/', async (req,res)=> {
    
    try {
        const count= await Temperament.count();     //cuento si hay menos de 100 registros es xq aun no se trajeron los temps de la Api
        console.log('HAY REGISTROS: ',count)
        
        if (count < 100){
            const temperamentsApi = await getTempAPI();
            await Temperament.bulkCreate(temperamentsApi); //se llena la tabla con los temperamentos de la tabla
            
        }
    } catch (error) { res.status(404).send('error al crear datos')}

    try {
        
        const temperaments =  await Temperament.findAll({
            order: [['nameTemp', 'ASC'],]
        })
        //const arrayDeTemps= temperaments.map(el => {el.nameTemp, el.id} );
        res.json(temperaments);    //devuelve un array de strings (temperamentos)
    } catch (e) {
        return('No se pudo acceder a la BD',e)        
    }
    
})



module.exports = router;