const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('temperament', {
        temp_name: {
            type: DataTypes.STRING,
            allowNull: false.valueOf,
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