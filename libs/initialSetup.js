const Role = require('../models/role');
const EstadoPedido = require('../models/estadoPedido')
const TipoEntrega = require('../models/tipoEntrega')
const TipoDocTribut = require('../models/tipoDocTribut')
const TipoDatosFA = require('../models/tipoDatosFA')
const QuienRetiraTienda = require('../models/quienRetiraTienda')
const QuienRecibe = require('../models/quienRecibe')

exports.createRoles = async () => {
    try {
        const roles = await Role.findAndCountAll({
            where: {}
        });

        const count = roles.count
        if (count > 0) return;

        await Promise.all([
            Role.create({
                name: 'admin',
            }),
            Role.create({
                name: 'moderator'
            }),
            Role.create({
                name: "client"
            }),
            Role.create({
                name: 'store'
            })
        ])

    } catch (error) {
        console.error(error)
    }
}
exports.createTipoDocTributario = async () => {
    try {
        const tipo = await TipoDocTribut.findAndCountAll({
            where: {}
        });

        const count = tipo.count
        if (count > 0) return;

        await Promise.all([
            TipoDocTribut.create({
                name: 'boleta',
            }),
            TipoDocTribut.create({
                name: 'factura'
            }),
            TipoDocTribut.create({
                name: "guia"
            })
        ])

    } catch (error) {
        console.error(error)
    }
}
exports.createTipoDatosFA = async () => {
    try {
        const tipo = await TipoDatosFA.findAndCountAll({
            where: {}
        });

        const count = tipo.count
        if (count > 0) return;

        await Promise.all([
            TipoDatosFA.create({
                name: 'mismo',
            }),
            TipoDatosFA.create({
                name: 'otros'
            })
        ])

    } catch (error) {
        console.error(error)
    }
}
exports.createTipoEntrega = async () => {
    try {
        const tipo = await TipoEntrega.findAndCountAll({
            where: {}
        });

        const count = tipo.count
        if (count > 0) return;

        await Promise.all([
            TipoEntrega.create({
                name: 'tienda',
            }),
            TipoEntrega.create({
                name: 'enviame'
            }),
            TipoEntrega.create({
                name: "pagar"
            })
        ])

    } catch (error) {
        console.error(error)
    }
}
exports.createQuienRetiraTienda = async () => {
    try {
        const tipo = await QuienRetiraTienda.findAndCountAll({
            where: {}
        });

        const count = tipo.count
        if (count > 0) return;

        await Promise.all([
            QuienRetiraTienda.create({
                name: 'misma',
            }),
            QuienRetiraTienda.create({
                name: 'otra'
            })
        ])

    } catch (error) {
        console.error(error)
    }
}
exports.createQuienRecibe = async () => {
    try {
        const tipo = await QuienRecibe.findAndCountAll({
            where: {}
        });

        const count = tipo.count
        if (count > 0) return;

        await Promise.all([
            QuienRecibe.create({
                name: 'misma',
            }),
            QuienRecibe.create({
                name: 'otra'
            }),
            QuienRecibe.create({
                name: 'conserjeria'
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

        await Promise.all([
            EstadoPedido.create({
                name: 'Preparación de Pedido',
            }),
            EstadoPedido.create({
                name: 'Listo para retiro'
            }),
            EstadoPedido.create({
                name: "entregado"
            }),
            EstadoPedido.create({
                name: 'rechazado'
            }),
         
        ])



    } catch (error) {
        console.error(error)
    }
}

