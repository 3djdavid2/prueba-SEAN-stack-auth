const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js')

class Carrito extends Model { }

Carrito.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    cliente: {
        type: DataTypes.STRING
    },
    productoId: {
        type: DataTypes.STRING
    },
    producto: {
        type: DataTypes.STRING
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
        type: DataTypes.BOOLEAN
    },
    ordenPedido:{
        type: DataTypes.NUMBER
    }
}, {
    sequelize,
    
    modelName: 'carrito'
})

module.exports = Carrito;