const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js')

class Retiroenvio extends Model { }

Retiroenvio.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ordenPedido: {
        type: DataTypes.STRING
    },
    lugarEntregaRetiro: {
        type: DataTypes.STRING
    },
    tiendaId: {
        type: DataTypes.STRING
    },
    domicilioDireccion: {
        type: DataTypes.STRING
    },
    monto: {
        type: DataTypes.NUMBER
    },
    recibe: {
        type: DataTypes.STRING
    },
    recibeOtra: {
        type: DataTypes.STRING
    },
    rutOtra: {
        type: DataTypes.STRING
    },
    nombreOtra: {
        type: DataTypes.STRING
    },
    
}, {
    sequelize,
    modelName: 'retiroenvio'
})

module.exports = Retiroenvio;