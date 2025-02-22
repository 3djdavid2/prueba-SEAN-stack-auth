const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js')

class Pagos extends Model { }

Pagos.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ordenPedido: {
        type: DataTypes.STRING
    },
    nombreComercio: {
        type: DataTypes.STRING
    },
    monto: {
        type: DataTypes.NUMBER
    },
    tipoPago: {
        type: DataTypes.STRING
    },
    transferenciaBanco: {
        type: DataTypes.STRING
    },
    tipoDTE: {
        type: DataTypes.STRING
    },
    folioDTE: {
        type: DataTypes.STRING
    },
    fechaDTE: {
        type: DataTypes.DATE
    },
    codAuth: {
        type: DataTypes.STRING
    },
    fechaTransaccion: {
        type: DataTypes.DATE
    },
    tipoTJ: {
        type: DataTypes.STRING
    },
    tipoCuotas: {
        type: DataTypes.STRING,
        defaultValue: 'SIN CUOTAS'
    },
    cantCuotas: {
        type: DataTypes.NUMBER,
        defaultValue: 1
    },
    montoCuota: {
        type: DataTypes.NUMBER
    },
    ultDigitos: {
        type: DataTypes.NUMBER
    },
    descripBienes: {
        type: DataTypes.STRING
    },
    tokenTransaccion: {
        type: DataTypes.STRING
    },
    url: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'pago'
})

module.exports = Pagos;