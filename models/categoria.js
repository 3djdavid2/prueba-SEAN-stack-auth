const { DataTypes } = require('sequelize');
const sequelize = require('../database.js');



const Categoria = sequelize.define('categoria', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING
    },

});

module.exports = Categoria;