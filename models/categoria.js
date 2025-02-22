const {Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js');


class Categoria extends Model { }
Categoria.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING
    },

}, {
    sequelize,
    modelName: 'categoria'


});

module.exports = Categoria;