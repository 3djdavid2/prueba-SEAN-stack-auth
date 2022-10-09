const { DataTypes } = require('sequelize');
const sequelize = require('../database.js')


const Pack = sequelize.define('pack', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    estado: {
        type: DataTypes.INTEGER
    },
    id_prod: {
        type: DataTypes.INTEGER
    },
    packName: {
        type: DataTypes.STRING
    },
    cantDesde: {
        type: DataTypes.INTEGER
    },
    precio: {
        type: DataTypes.INTEGER
    }    


});


module.exports = Pack;
