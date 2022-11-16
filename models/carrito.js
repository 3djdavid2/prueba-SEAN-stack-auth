const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js')

class Carrito extends Model { }

Carrito.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tipoEntrega: {
        type: DataTypes.STRING
    },
    cliente: {
        type: DataTypes.STRING
    },
    productoId: {
        type: DataTypes.NUMBER
    },
    codigo: {
        type: DataTypes.NUMBER
    },
    producto: {
        type: DataTypes.STRING
    },
    precioOriginal: {
        type: DataTypes.NUMBER
    },
    precio: {
        type: DataTypes.NUMBER
    },
    cantidad: {
        type: DataTypes.NUMBER
    },
    total: {
        type: DataTypes.NUMBER
    },
    sesion: {
        type: DataTypes.DATE
    },
    ordenPedido: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.STRING
    }
}, {
    sequelize,

    modelName: 'carritos'
})

module.exports = Carrito;