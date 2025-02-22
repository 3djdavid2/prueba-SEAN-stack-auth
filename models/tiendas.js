const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js')

class Tiendas extends Model { }

Tiendas.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN
    },
    nombre: {
        type: DataTypes.STRING
    },
    horario: {
        type: DataTypes.STRING
    },
    dias: {
        type: DataTypes.STRING
    },
    direccion: {
        type: DataTypes.STRING
    },
    telefono: {
        type: DataTypes.STRING
    },
    encargado: {
        type: DataTypes.STRING
    },
    lugar: {
        type: DataTypes.STRING
    },
    linkDireccion: {
        type: DataTypes.STRING
    },
    WhatsApp: {
        type: DataTypes.STRING
    },

}, {
    sequelize,
    modelName: 'tiendas'
})

module.exports = Tiendas;