
const Carrito = require('../models/carrito')
const { Op } = require('sequelize');


//Obtener listado de compras con orden pagadas
exports.getCompra = async (req, res) => {

    email = req.body.email
    const compras = await Carrito.findAndCountAll({

        where: { cliente: email, ordenPedido: { [Op.ne]: '' } },


    });

    res.status(200).json(compras);

}