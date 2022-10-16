const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js')


class QuienRecibe extends Model { }

QuienRecibe.init({
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
    modelName: 'quienRecibes'
})

module.exports = QuienRecibe;