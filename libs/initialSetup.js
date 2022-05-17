const Role = require('../models/role');

exports.createRoles = async () => {
    try {
        const roles = await Role.findAndCountAll({
            where: {}
        });

        const count = roles.count
        if (count > 0) return;

        const rolesSave = await Promise.all([
            Role.create({
                name: 'admin',
            }),
            Role.create({
                name: 'moderator'
            }),
            Role.create({
                name: "client"
            })
        ])

         console.log("Roles creados:", rolesSave);

    } catch (error) {
        console.error(error)
    }
}




