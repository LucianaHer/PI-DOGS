const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Temperament', {
        nameTemp: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                isAlpha: true
            } 
        }
    },
    {
        timestamps: false
    });
}