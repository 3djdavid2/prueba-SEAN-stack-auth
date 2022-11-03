require('dotenv').config();
var axios = require('axios');

const User = require('../models/users')
const DireccionesClientes = require('../models/direccionesCliente');
const OrdenEnviame = require('../models/ordenEnviame');
const RespuestaTBK = require('../models/respTBK');
const Carrito = require('../models/carrito');
const RespuestaEnviame = require('../models/respEnviame');

const guardarCompraTBK = async (req, res, next) => {

    const {
         name, phone, email
         } = req.body
    const {
        dimensions, DomicilioId, totalaPagar, tipoEntrega
    } = req.body.detalleCompra

    const socketId = req.body.datosCompra.socketId;
    const tokenTBK = req.body.datosCompra.token;
    const {
        vci, amount, status, buy_order, session_id, card_detail,
        accounting_date, transaction_date, authorization_code, payment_type_code,
        response_code, installments_number
    } = req.body.datosCompra.commitResponse

    //guardar datos de la transaccion de transbank en bd:
    await RespuestaTBK.create(
        {
            socketId,
            tokenTBK,
            vci,
            amount,
            status,
            buy_order,
            session_id,
            card_number: card_detail.card_number,
            accounting_date,
            transaction_date,
            authorization_code,
            payment_type_code,
            response_code,
            installments_number,
        }
    );

    let ordenPedido = req.body.datosCompra.commitResponse.buy_order // moment().format('DMMyyyy-HHmm');

    let sessionId = req.body.datosCompra.commitResponse.session_id //moment.tz(fechaActual, "America/Santiago").format();  

    // update Carrito con sesion y orden del pedido generado en el pago de backend
    await Carrito.update(
        {
            sesion: sessionId,
            ordenPedido: ordenPedido
        },
        { where: { cliente: email, ordenPedido: '' } }
    );

    //buscar domicilioId como string
    if (tipoEntrega == '2') {
        const direccion = await DireccionesClientes.findAndCountAll({
            where: {
                id: DomicilioId
            }
        });

        const { costoEnviame } = req.body
        const { calleNombre, calleNumero, ciudad, pisoOficinaDepto } = direccion.rows[0].dataValues

        req.body.calleNombre = calleNombre
        req.body.calleNumero = calleNumero
        req.body.ciudad = ciudad
        req.body.pisoOficinaDepto = pisoOficinaDepto

        //dimensiones del paquete total

        const altocm = dimensions[0]
        const largocm = dimensions[0]
        const anchocm = dimensions[0]
        const volumenM3 = (altocm * largocm * anchocm) / 1000000;
        // const pesoPagar = dimensions[1] //no
        const pesoKG = dimensions[2]

        if (costoEnviame > 0) {

            carritoCreateEnviameCosto = await Carrito.create({

                cliente: email,
                productoId: 0,
                codigo: 1,
                producto: "Envio Domicilio",
                precioOriginal: null,
                precio: costoEnviame,
                cantidad: 1,
                total: costoEnviame,
                sesion: sessionId,
                ordenPedido: ordenPedido
            });

            //guardar y generar post para que aparezca el envio en plataforma de ENVIAME:

            // const crearEnvioEnviame = await OrdenEnviame.create( //no es necesaria la constante :crearEnvioEnviame

            await OrdenEnviame.create(
                {
                    n_packages: 1,
                    content_description: 'telas, maquinas coser',
                    imported_id: ordenPedido,
                    order_price: totalaPagar,
                    weight: pesoKG,
                    volume: volumenM3,
                    type: 'delivery',
                    width: anchocm,
                    height: altocm,
                    length: largocm,
                    warehouse_code: '101',
                    name: name,
                    email,
                    phone: '',
                    place: ciudad,
                    full_address: calleNombre + ' ' + calleNumero,
                    information: pisoOficinaDepto,
                    carrier_code: "BLX",
                    carrier_service: '',
                    tracking_number: ''
                }
            )

            var data = {
                "shipping_order": {
                    "n_packages": 1,
                    "content_description": "telas, maquinas coser",
                    "imported_id": ordenPedido,
                    "order_price": totalaPagar,
                    "weight": pesoKG,
                    "volume": volumenM3,
                    "type": "delivery"
                },
                "dimensions": {
                    "width": anchocm,
                    "height": altocm,
                    "length": largocm
                },
                "shipping_origin": {
                    "warehouse_code": "101"
                },
                "shipping_destination": {
                    "customer": {
                        "name": name,
                        "email": email,
                        "phone": phone
                    },
                    "delivery_address": {
                        "home_address": {
                            "place": ciudad,
                            "full_address": calleNombre + ' ' + calleNumero + ',' + ciudad,
                            "information": pisoOficinaDepto
                        }
                    }
                },
                "carrier": {
                    "carrier_code": "BLX",
                    "carrier_service": "",
                    "tracking_number": ""
                }
            };

            var config = {
                method: 'post',
                url: 'https://api.enviame.io/api/s2/v2/companies/8706/deliveries',
                headers: {
                    'Accept': 'Application/json',
                    'api-key': process.env.ENVIAME_API_KEY,
                    'Content-Type': 'Application/json'
                },
                data: data
            };

            //peticion post hacia enviame para generar el envio en su plataforma (el envio se debe revisar de todas maneras)
            axios(config)
                .then(async function (response) {

                    console.log("respuesta desde ENVIAME DE AXIOS CONFIG")
                    dataobj = response.data.data

                    const {
                        identifier,
                        imported_id,
                        tracking_number,
                        country,
                        carrier,
                        service,
                        barcodes,
                        deadline_at,
                        created_at,
                        updated_at
                    }
                        = dataobj



                    links_rel_self = dataobj.links[0].href
                    links_rel_tracking = dataobj.links[1].href
                    links_rel_trackingweb = dataobj.links[2].href

                    const { id, name, code, info } = dataobj.status
                    const dataStatuscreated_at = dataobj.status.created_at
                    const { full_name, phone, email } = dataobj.customer
                    const { full_address, place, type } = dataobj.shipping_address
                    const { PDF, ZPL, PNG } = dataobj.label

                    //guardo en bd respuestaEnviames
                    await RespuestaEnviame.create({
                        identifier,
                        imported_id,
                        tracking_number,
                        status_id: id,
                        status_name: name,
                        status_code: code,
                        status_info: info,
                        status_created_at: dataStatuscreated_at,
                        customer_full_name: full_name,
                        customer_phone: phone,
                        customer_email: email,
                        shipping_address_full_address: full_address,
                        shipping_address_place: place,
                        shipping_address_type: type,
                        country,
                        carrier,
                        service,
                        label_PDF: PDF,
                        label_ZPL: ZPL,
                        label_PNG: PNG,
                        barcodes,
                        deadline_at,
                        created_at,
                        updated_at,
                        links_rel_self,
                        links_rel_tracking,
                        links_rel_trackingweb
                    })

                    //todo enviame procesos

                    next()

                })
                .catch(function (error) {
                    console.log("error en axios", error);
                    next()
                });
        } else {
            console.log("enviame es cobro 0, algo esta mal")
            next();
        }

    } else {
        next()
    }
};

//CONSULTAR SI EXISTE EL EMAIL EN BD SQLITE
const findUserByEmail = async (req, res, next) => {

    console.log("MIDDLEWARE findUserByEmail")

    const user = await User.findAll(
        {
            raw: true,
            where: {
                email: req.body.email
            }
        }
    )

    // console.log("El user encontrado aqui:", user[0].nombre) 
    if (user.length != 0) {
        req.body.name = user[0].nombre
        req.body.phone = user[0].telefono
    } else {

        req.body.name = null
        req.body.phone = null
    }

    next()

};
module.exports = {
    findUserByEmail,
    guardarCompraTBK
}