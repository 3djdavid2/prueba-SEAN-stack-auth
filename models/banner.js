const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js')

class Banner extends Model { }

Banner.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    imgURL: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.BOOLEAN
    }

    
}, {
    sequelize,

    modelName: 'banners'
})

module.exports = Banner;