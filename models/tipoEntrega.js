const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js')


class TipoEntrega extends Model { }

TipoEntrega.init({

    name: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    
    modelName: 'tipoEntrega'
})

module.exports = TipoEntrega;