const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js')

class User extends Model { }

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    role:{
        type: DataTypes.STRING,
        defaultValue: 'client'
    }
}, {
    sequelize,
    modelName: 'user'
})

module.exports = User;
