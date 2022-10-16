const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js')


class QuienRetiraTienda extends Model { }

QuienRetiraTienda.init({
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
    modelName: 'quienRetiraTiendas'
})

module.exports = QuienRetiraTienda;