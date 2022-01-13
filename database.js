const Sequelize = require('sequelize');

const sequelize = new Sequelize('tes-db', 'email', 'pass', {
    dialect: 'sqlite',
    host: './miBase.sqlite'
});

module.exports= sequelize;

