
const Tiendas = require('../models/tiendas')

exports.getSucursales = async (req, res) => {
    console.log(req.body)
    const sucursal = await Tiendas.findAndCountAll({

        where: {  }
    });
    res.status(200).json(sucursal)

}

