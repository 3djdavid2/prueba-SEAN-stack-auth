const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js')

class Transferencia extends Model { }

Transferencia.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    nombre: {
        type: DataTypes.STRING
    },
    rut: {
        type: DataTypes.STRING
    },
    banco: {
        type: DataTypes.STRING
    },
    tipocuenta: {
        type: DataTypes.STRING
    },
    numcuenta: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    alias: {
        type: DataTypes.STRING
    },
    instrucciones: {
        type: DataTypes.STRING
    },
}, {
    sequelize,  
    modelName: 'transferencia'
})

module.exports = Transferencia;