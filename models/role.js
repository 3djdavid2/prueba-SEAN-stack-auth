const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js')

// export const ROLES = ["client", "admin", "moderator"]

class Role extends Model { }

Role.init({

    name: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'role'
})

module.exports = Role;