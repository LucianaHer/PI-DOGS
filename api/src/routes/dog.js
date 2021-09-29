// var express = require('express');
// var router = express.Router();

// const { Dog, Temperament } = require('../models');

// router.post('/', async (req,res)=> {
//     const { nombre, altura, peso, años, temperamentos}= req.body;

//     if (!nombre || !altura || !peso){
//         return res.send('faltan datos ')
//     }
//     try{
//         const[dog, created]= await Dog.findOrCreate({
//             where:{
//               name: nombre,
//               heigth: altura,
//               weigth: peso,
//               life_span: años,
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