const { DataTypes } = require('sequelize');
const sequelize = require('../database.js');



const DireccionesClientes = sequelize.define('direccionesCliente', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    clienteEmail: {
        type: DataTypes.STRING
    },
    nombreDireccion: {
        type: DataTypes.STRING
    },
    calleNombre: {
        type: DataTypes.STRING
    },
    calleNumero: {
        type: DataTypes.NUMBER
    },
    pisoOficinaDepto: {
        type: DataTypes.STRING
    },
    ciudad: {
        type: DataTypes.STRING
    },
    provincia: {
        type: DataTypes.STRING
    },
    region: {
        type: DataTypes.STRING
    },
    predeterminado:{
        type: DataTypes.BOOLEAN
    }

});

module.exports = DireccionesClientes;