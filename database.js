const Sequelize = require('sequelize');

const sequelize = new Sequelize('tes-db', 'email', 'pass', {
    dialect: 'sqlite',
    host: './bd-main.sqlite'
});

module.exports= sequelize;

