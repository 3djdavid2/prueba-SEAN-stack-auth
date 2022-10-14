const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js')
// const EstadoPedido = require('../models/estadoPedido')

class Ordenes extends Model { }

Ordenes.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    orden: {
        type: DataTypes.STRING
    },
    ot: {
        type: DataTypes.STRING
    },
    status_name: {
        type: DataTypes.STRING
    },
    status_code: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    idsProductos: {
        type: DataTypes.STRING
    },
    codProductos: {
        type: DataTypes.STRING
    },
    cantProductos: {
        type: DataTypes.STRING
    },
    tipoEntrega: {
        type: DataTypes.STRING
    },
    tienda: {
        type: DataTypes.STRING
    },
    quienRetira: {
        type: DataTypes.STRING
    },
    rutRetira: {
        type: DataTypes.STRING
    },
    nombreRetira: {
        type: DataTypes.STRING
    },
    DomicilioId: {
        type: DataTypes.NUMBER
    },
    quienRecibe: {
        type: DataTypes.STRING
    },
    rutRecibe: {
        type: DataTypes.STRING
    },
    nombreRecibe: {
        type: DataTypes.STRING
    },
    tipoDoc: {
        type: DataTypes.STRING
    },
    tipoDatosFA: {
        type: DataTypes.STRING
    },
    rutFA: {
        type: DataTypes.STRING
    },
    razonFA: {
        type: DataTypes.STRING
    },
    giroFA: {
        type: DataTypes.STRING
    },
    telFA: {
        type: DataTypes.STRING
    },



}, {
    sequelize,
    modelName: 'orden'
})



module.exports = Ordenes;