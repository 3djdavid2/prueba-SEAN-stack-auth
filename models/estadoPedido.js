const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js')

// estados = ["listo para despacho", "enviado", "entregado", "rechazado", "pendiente", "cancelado"]

class EstadoPedido extends Model { }

EstadoPedido.init({

    name: {
        type: DataTypes.STRING
    }
}, {
    sequelize,    
    modelName: 'estadopedidos'
})

module.exports = EstadoPedido;