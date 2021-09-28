// var express = require('express');
// var router = express.Router();

// const { Dog, Temperament } = require('../models');

// router.post('/', async (req,res)=> {
//     const { name, heigth, weigth, life_span, temperaments}= req.body;

//     if (!name || !heigth || !weigth){
//         return res.send('faltan datos obligatorios')
//     }
//     try{
//         const[dog, created]= await Dog.findOrCreate({
//             where:{
//               name,
//               heigth,
//               weigth,
//               life_span
//             }
//         });

//         if (temperaments){
//             //temperaments.map
//             const temp= await Temperament.create({
//                 where: {
//                     temp_name: temperaments
//                 }
//             })
//         }

//         // await dog.addTemperament(temp); //vincula el usuario con la pagina
//         // await temp.addCategories(categories); //vincula el PAGINA con la categoria  
//     }
//     catch(e){}


// })



// module.exports = router;