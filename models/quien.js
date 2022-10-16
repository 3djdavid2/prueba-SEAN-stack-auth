const { DataTypes } = require('sequelize');
const sequelize = require('../database.js');

const Quien = sequelize.define('quien', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING
    },

});

module.exports = Quien;