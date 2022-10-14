require('dotenv').config();

const Ordenes = require('../models/orden');
const Carrito = require('../models/carrito');
const RespuestaEnviame= require('../models/respEnviame');
const TipoEntrega = require('../models/tipoEntrega');
const { Op } = require('sequelize');

// const moment = require('moment-timezone');
// moment.tz("America/Santiago").format();

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

    var OT = 0
    var status_name = 'Preparación de Pedido'
    var status_code = ''

    //obtengo numero de tracking 

    const datosEnviame = await RespuestaEnviame.findAll(
        {
            raw: true,
            where: { imported_id: ordenPedido }
        }
    );

   

    if (datosEnviame.length > 0) {//existe

        console.log("el number ot encontrado es: ", datosEnviame[0])
        OT = datosEnviame[0].tracking_number;
        status_name = datosEnviame[0].status_name;
        status_code = datosEnviame[0].status_code;

    } 

    var tipoEntrega=req.body.detalleCompra.tipoEntrega

    const {
        idsProductos,
        codProductos,
        cantProductos,
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
        orden: ordenPedido,
        ot: OT,
        status_name,
        status_code,
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

    const tipo = await TipoEntrega.findAll(
        {
            raw:true,
            where: {id:tipoEntrega}
        }
    )

   const strTipoEntrega = tipo[0].name

    //actualiza estado de carrito de cliente
    await Carrito.update(
        {
            estado: status_name,
            tipoEntrega: strTipoEntrega
        },

        {
            where: {ordenPedido}
        }
    )

    res.status(200).json({ message: 'ok' });

}