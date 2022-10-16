const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js')


class TipoDatosFA extends Model { }

TipoDatosFA.init({
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
    modelName: 'tipoDatosFAs'
})

module.exports = TipoDatosFA;