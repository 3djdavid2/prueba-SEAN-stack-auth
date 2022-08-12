const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js')
const EstadoPedido = require('../models/estadoPedido')

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
        type: DataTypes.STRING
    },
    cliente: {
        type: DataTypes.STRING
    },
    monto: {
        type: DataTypes.NUMBER
    },
    items: {
        type: DataTypes.NUMBER
    },
    cantProd: {
        type: DataTypes.NUMBER
    },
    codigoProd: {
        type: DataTypes.NUMBER
    },
    impreso: {
        type: DataTypes.STRING
    },
    reenvioFecha: {
        type: DataTypes.STRING
    },
    estado_id: {
        type: DataTypes.NUMBER,
        references: {
            model: EstadoPedido,
            key: 'id',
        }

    },
}, {
    sequelize,
    modelName: 'orden'
})

Ordenes.belo

module.exports = Ordenes;