const { DataTypes } = require('sequelize');
const sequelize = require('../database.js')


const PackMix = sequelize.define('packmix', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_mix: {
        type: DataTypes.INTEGER
    },
    mixName:{
        type: DataTypes.STRING
    },
    idProd1: {
        type: DataTypes.INTEGER
    },
    idProd2: {
        type: DataTypes.INTEGER
    },
    idProd3: {
        type: DataTypes.INTEGER
    },
    idProd4: {
        type: DataTypes.INTEGER
    },
    idProd5: {
        type: DataTypes.INTEGER
    },
    idProd6: {
        type: DataTypes.INTEGER
    },
    
    precio: {
        type: DataTypes.INTEGER
    }    


});


module.exports = PackMix;