require('dotenv').config();


//TODO
const Ordenes = require('../models/orden');
const Carrito = require('../models/carrito');
const RespuestaEnviame = require('../models/respEnviame');


const { Op } = require('sequelize');
const moment = require('moment-timezone');
moment.tz("America/Santiago").format();

//Obtener listado de compras con orden pagadas //QUE NO SEAN VACIAS=> [Op.ne]: ''

exports.getCompra = async (req, res) => {

    email = req.body.email
    const compras = await Carrito.findAndCountAll({
        order: [['sesion', 'desc']],

        where: { cliente: email, ordenPedido: { [Op.ne]: '' } }

    });

    res.status(200).json(compras);

}

//Crear compra

exports.createCompra = async (req, res) => {


    const { calleNombre, calleNumero, ciudad, pisoOficinaDepto } = req.body


    let ordenPedido = req.body.datosCompra.commitResponse.buy_order
    const { email } = req.body


    console.log('ordenPedido', ordenPedido)
    //obtengo numero de tracking //todo

    const numberOT = await RespuestaEnviame.findAll(
        {
            raw: true,
            where: { imported_id: `O-${ordenPedido}` }
        }
    );

    console.log("el numberot encontrado es: ", numberOT[0])

    const OT = numberOT[0].tracking_number


    const {
        idsProductos,
        codProductos,
        cantProductos,
        tipoEntrega,
        tienda,
        quienRetira,
        rutRetira,
        nombreRetira,
        quienRecibe,
        rutRecibe,
        nombreRecibe,
        tipoDoc,
        tipoDatosFA,
        rutFA,
        razonFA,
        giroFA,
        telFA,
    } = req.body.detalleCompra
    // const { calleNombre, calleNumero, ciudad, pisoOficinaDepto } = req.body
    await Ordenes.create({
        orden: `O-${ordenPedido}`,
        ot: OT,
        email,
        idsProductos: idsProductos.toString(),
        codProductos: codProductos.toString(),
        cantProductos: cantProductos.toString(),
        tipoEntrega,
        tienda,
        quienRetira,
        rutRetira,
        nombreRetira,
        DomicilioId: calleNombre + ' ' + calleNumero + ' ' + ciudad,
        quienRecibe,
        rutRecibe,
        nombreRecibe,
        tipoDoc,
        tipoDatosFA,
        rutFA,
        razonFA,
        giroFA,
        telFA,
    })

    //

    res.status(200).json({ message: 'ok' });

}