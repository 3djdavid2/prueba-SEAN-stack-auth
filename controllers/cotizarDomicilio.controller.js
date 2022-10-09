
const Direction = require('../models/direccionesCliente')

exports.getCotizacion = async (req, res) => {

    const email = req.body.email

    const cotizacion = await Direction.findAndCountAll({
        where: {
            clienteEmail: email
        }
    });

    res.status(200).json(cotizacion)
}



