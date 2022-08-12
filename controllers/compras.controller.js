
const Carrito = require('../models/carrito')
const { Op } = require('sequelize');

const moment = require('moment');


//Obtener listado de compras con orden pagadas
exports.getCompra = async (req, res) => {

    email = req.body.email
    const compras = await Carrito.findAndCountAll({

        where: { cliente: email, ordenPedido: { [Op.ne]: '' } },

    });

    res.status(200).json(compras);

}

//Obtener listado de compras con orden pagadas
exports.createCompra = async (req, res) => {


    //todo BORRAR DESPUES ESTA PARTE:
    let diaCompra = moment().format('DMMyyyy-HHmm');
    let sessionId = moment().format('DMMyyyy');




    console.log("clg en backend", req.body)
    const { idsProductos, email, tienda, rut, nombre, tipoDoc, tipoEntrega, totalaPagar, tipo } = req.body


    // update Carrito con sesion y orden del pedido generado en el pago de backend
    carritoSave = await Carrito.update(
        {
            sesion: `${sessionId}`,
            ordenPedido: `O-${diaCompra}`

        },
        { where: { id: idsProductos } }

    );


    //todo Pagos
    //TRANSFERENCIA: se debe esperar notificacion de Dieter para
    //generar la orden de carga y envio

    //TARJETA TRANSBANK PLUS:
    //generar la orden de carga y envio

    //todo devolver orden y sesion al Carrito
    //UPDATE a Carrito model BD



    res.status(200).json({ message: 'ok', image: req.body });

}