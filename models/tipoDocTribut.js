const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js')


class TipoDocTribut extends Model { }

TipoDocTribut.init({
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
    modelName: 'tipoDocTributs'
})

module.exports = TipoDocTribut;