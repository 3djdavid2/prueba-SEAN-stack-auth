const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js')

class TipoEntrega extends Model { }

TipoEntrega.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    }
}, {
    sequelize,    
    modelName: 'tipoEntregas'
})

module.exports = TipoEntrega;