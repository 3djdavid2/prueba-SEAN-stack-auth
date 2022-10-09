const { DataTypes } = require('sequelize');
const sequelize = require('../database.js');



const OrdenEnviame = sequelize.define('ordenEnviame', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    n_packages: {
        type: DataTypes.NUMBER
    },
    content_description: {
        type: DataTypes.STRING
    },
    imported_id: {
        type: DataTypes.STRING
    },
    order_price: {
        type: DataTypes.NUMBER
    },
    weight: {
        type: DataTypes.STRING
    },
    volume: {
        type: DataTypes.STRING
    },
    type: {
        type: DataTypes.STRING
    },


    width: {
        type: DataTypes.NUMBER
    },
    height: {
        type: DataTypes.NUMBER
    },
    length: {
        type: DataTypes.NUMBER
    },



    warehouse_code: {
        type: DataTypes.STRING
    },




    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },



    place: {
        type: DataTypes.STRING
    },
    full_address: {
        type: DataTypes.STRING
    },
    information: {
        type: DataTypes.STRING
    },


    carrier_code: {
        type: DataTypes.STRING
    },
    carrier_service: {
        type: DataTypes.STRING
    },
    tracking_number: {
        type: DataTypes.STRING
    }   

});

module.exports = OrdenEnviame;