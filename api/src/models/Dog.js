const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    id: {
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      // validate:{
      //   isAlpha: true,  //solo admite letras
      // }
    },

    height: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   isNumeric: true,  // que solo se pueda ingresar números
      //   len: [1,3],       // que tenga un length entre 1 y 3
      //   min: 10,          // altura min
      //   max: 100,         //altura max
      // },
      // set(value){   // seteo q se guarde como un string de rango entre el valor-2, un -, y el valor +2
      //   let min= value-2;
      //   let max = number(value)+2;
      //   let heigt_range= min.toString() + ' - ' + max.toString();
      //   this.setDataValue('height',  heigt_range);
      // },
    },

    weight: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   isNumeric: true,
      //   len: [1,2]
      // },
    },
    
    life_span: {
      type: DataTypes.STRING,
      // validate:{
      //   isNumeric: true,
      //   len: [1,2],
      //   max: 20,
      // },
      get(){
        return this.getDataValue('life_span') + ' años';
      }
    },

    createInDb: { // para acceder a los dogs creados en mi BD, y diferenciarlos de los de la API externa
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true, 
    },

    image: {
      type: DataTypes.TEXT,

    }
  
  }, 
    {
      timestamps: false
    })  
};
