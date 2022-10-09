const { DataTypes } = require('sequelize');
const sequelize = require('../database.js');



const RespuestaTBK = sequelize.define('respuestaTBK', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    
    socketId: {
        type: DataTypes.STRING
    },
    tokenTBK: {
        type: DataTypes.STRING
    },
    vci: {
        type: DataTypes.STRING
    },

    amount: {
        type: DataTypes.NUMBER
    },

    status: {
        type: DataTypes.STRING
    },


    buy_order: {
        type: DataTypes.STRING
    },


    session_id: {
        type: DataTypes.STRING
    },

    card_number: {
        type: DataTypes.STRING
    },

    accounting_date: {
        type: DataTypes.STRING
    },

    transaction_date: {
        type: DataTypes.DATE
    },

    authorization_code: {
        type: DataTypes.STRING
    },
    payment_type_code: {
        type: DataTypes.STRING
    },
    response_code: {
        type: DataTypes.NUMBER
    },
    installments_number: {
        type: DataTypes.NUMBER
    },
  

});

module.exports = RespuestaTBK;