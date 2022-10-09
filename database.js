const Sequelize = require('sequelize');

const sequelize = new Sequelize('test-db', 'email', 'pass', {

    freezeTableName: true,

    dialect: 'sqlite',
    host: './bd-main.sqlite',
  
});

module.exports = sequelize;

