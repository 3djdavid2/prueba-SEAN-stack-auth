const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js')

class User extends Model { }

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    socketId:{
        type: DataTypes.STRING
    },
    token_ws:{

        type: DataTypes.STRING
    },
    token:{

        type: DataTypes.STRING
    },
    tokenExpirado:{
        type: DataTypes.BOOLEAN
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
    },
    statusEmail:{
        type: DataTypes.STRING,
        defaultValue:'unconfirmed'
    },
    nombre:{
        type: DataTypes.STRING
    },
    rut:{
        type: DataTypes.STRING
    },
    telefono:{
        type: DataTypes.STRING
    },
    direccion:{
        type: DataTypes.STRING
    },
    telefonoRecibe:{
        type: DataTypes.STRING
    },
    direccionDespacho:{
        type: DataTypes.STRING
    },

}, {
    sequelize,
  
    modelName: 'users'
})

module.exports = User;
