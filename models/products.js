const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js')

class Product extends Model { }

Product.init({
    nombre: {
        type: DataTypes.STRING
    },
    familia: {
        type: DataTypes.STRING
    },
    marca: {
        type: DataTypes.STRING
    },
    descripcion: {
        type: DataTypes.STRING
    },
    imgURL: {
        type: DataTypes.STRING
    },
    codigo: {
        type: DataTypes.NUMBER
    },
    precio: {
        type: DataTypes.NUMBER
    },
    cantidad: {
        type: DataTypes.NUMBER
    },
    estado: {
        type: DataTypes.BOOLEAN
    },
}, {
    sequelize,
    modelName: 'product'
})

module.exports = Product;

