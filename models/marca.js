
const { DataTypes } = require('sequelize');
const sequelize = require('../database.js');



const Marca = sequelize.define('marca', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING
    },

});

module.exports=Marca;
