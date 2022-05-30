const Role = require('../models/role');
const EstadoPedido = require('../models/estadoPedido')

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

    } catch (error) {
        console.error(error)
    }
}


exports.createEstadoPedido = async () => {
    
    try {
        const estado = await EstadoPedido.findAndCountAll({
            where: {}
        });

        const counta = estado.count
        if (counta > 0) return;

        const estadoSave = await Promise.all([
            EstadoPedido.create({
                name: 'listoparadespacho',
            }),
            EstadoPedido.create({
                name: 'enviado'
            }),
            EstadoPedido.create({
                name: "entregado"
            }),
            EstadoPedido.create({
                name: 'rechazado',
            }),
            EstadoPedido.create({
                name: 'pendiente'
            }),
            EstadoPedido.create({
                name: "cancelado"
            })
        ])

    

    } catch (error) {
        console.error(error)
    }
}

