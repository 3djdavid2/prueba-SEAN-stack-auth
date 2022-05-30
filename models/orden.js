const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js')

class Ordenes extends Model { }

Ordenes.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ordenPedido: {
        type: DataTypes.STRING
    },
    fechaPedido: {
        type: DataTypes.STRING
    },
    horaPedido: {
        type: DataTypes.NUMBER
    },
    cliente: {
        type: DataTypes.STRING
    },
    monto: {
        type: DataTypes.NUMBER
    },
    items: {
        type: DataTypes.STRING
    },
    cantProd: {
        type: DataTypes.STRING
    },
    codigoProd: {
        type: DataTypes.NUMBER
    },
    impreso: {
        type: DataTypes.NUMBER
    },
    reenvioFecha: {
        type: DataTypes.NUMBER
    },
    estado: {
        type: DataTypes.BOOLEAN
    },
}, {
    sequelize,
    modelName: 'orden'
})

module.exports = Ordenes;