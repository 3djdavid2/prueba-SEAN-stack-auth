require('dotenv').config();

const Ordenes = require('../models/orden');
const Carrito = require('../models/carrito');
const RespuestaEnviame = require('../models/respEnviame');
const TipoEntrega = require('../models/tipoEntrega');
const { Op } = require('sequelize');


//Obtener listado de compras con orden pagadas //QUE NO SEAN VACIAS=> [Op.ne]: ''

exports.getCompra = async (req, res) => {

    email = req.body.email;

    const compras = await Carrito.findAndCountAll({
        order: [['sesion', 'desc']],
        where: { cliente: email, ordenPedido: { [Op.ne]: '' } }
    });

    res.status(200).json(compras);

}

//Crear compra

exports.createCompra = async (req, res) => {
    console.log("compras.controller-createCompra function start")
    var tiendaId = null;
    var quienRetiraId = null;
    var quienRecibeId = null;
    var tipoDatosFAId = null;

    var OT = 0
    var status_name = 'Preparación de Pedido'
    var status_code = ''

    const { calleNombre, calleNumero, ciudad, pisoOficinaDepto } = req.body

    var ordenPedido = req.body.datosCompra.commitResponse.buy_order
    const { email } = req.body

    //documento tributario*-*-*-
    var tipoDocId = +req.body.detalleCompra.tipoDoc
    if (tipoDocId == 2) {
        console.log("tipodoc 2 es FACTURA")
        tipoDatosFAId = +req.body.detalleCompra.tipoDatosFA
    };
    //   
    var tipoEntregaId = +req.body.detalleCompra.tipoEntrega

    if (tipoEntregaId == 2) {//ENVIAME
        console.log("tipo enviame")
        const datosEnviame = await RespuestaEnviame.findAll(
            {
                raw: true,
                where: { imported_id: ordenPedido }
            }
        );

        OT = datosEnviame[0].tracking_number;
        status_name = datosEnviame[0].status_name;
        status_code = datosEnviame[0].status_code;
        quienRecibeId = +req.body.detalleCompra.quienRecibe

    }



    if (tipoEntregaId == 1) {
        console.log("entrega en tienda")
        tiendaId = +req.body.detalleCompra.tienda
        quienRetiraId = +req.body.detalleCompra.quienRetira

    } else if (tipoEntregaId == 3) {
        console.log("envio por pagar")
        // quienRecibeId = +req.body.detalleCompra.quienRecibe
    };

    const {
        idsProductos,
        codProductos,
        cantProductos,
        rutRetira,
        nombreRetira,
        rutRecibe,
        nombreRecibe,
        rutFA,
        razonFA,
        giroFA,
        telFA,
    } = req.body.detalleCompra

    //TODO crear esto en rutas-*-*-*-**-**-*-*-*
    await Ordenes.create({
        orden: ordenPedido,
        ot: OT,
        status_name,
        status_code,
        email,
        idsProductos: idsProductos.toString(),
        codProductos: codProductos.toString(),
        cantProductos: cantProductos.toString(),
        tipoEntregaId,
        tiendaId,
        quienRetiraId,
        rutRetira,
        nombreRetira,
        DomicilioId: calleNombre + ' ' + calleNumero + ' ' + ciudad,
        quienRecibeId,
        rutRecibe,
        nombreRecibe,
        tipoDocId,
        tipoDatosFAId,
        rutFA,
        razonFA,
        giroFA,
        telFA,
    })

    const tipo = await TipoEntrega.findAll(
        {
            raw: true,
            where: { id: tipoEntregaId }
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
            where: { ordenPedido }
        }
    )

    res.status(200).json({ message: 'ok' });

}