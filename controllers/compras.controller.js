require('dotenv').config();
var axios = require('axios');

//TODO
const Ordenes = require('../models/orden') //todo

const Carrito = require('../models/carrito');
const RespuestaEnviame = require('../models/respEnviame');
const DireccionesClientes = require('../models/direccionesCliente');
const OrdenEnviame = require('../models/ordenEnviame');
const RespuestaTBK = require('../models/respTBK');

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

    const { name, phone, email } = req.body
    const { dimensions, DomicilioId, totalaPagar, tipoEntrega } = req.body.detalleCompra

    const socketId = req.body.datosCompra.socketId;
    const tokenTBK = req.body.datosCompra.token;
    const { vci, amount, status, buy_order, session_id, card_detail, accounting_date, transaction_date, authorization_code, payment_type_code, response_code, installments_number } = req.body.datosCompra.commitResponse
    let ordenPedido = req.body.datosCompra.commitResponse.buy_order // moment().format('DMMyyyy-HHmm');
    let sessionId = req.body.datosCompra.commitResponse.session_id //moment.tz(fechaActual, "America/Santiago").format();  

    //buscar domicilioId como string
    if (tipoEntrega == '2') {
        const direccion = await DireccionesClientes.findAndCountAll({
            where: {
                id: DomicilioId
            }
        });
        // console.log("la direccion es: ", direccion.rows[0].dataValues)
        // la direccion es:  {
        //     id: 16,
        //     clienteEmail: 'dj.vivanco@gmail.com',
        //     nombreDireccion: 'enviame test',
        //     calleNombre: 'Avenida Ralco Lepoy',
        //     calleNumero: '',
        //     pisoOficinaDepto: 'test enviame',
        //     ciudad: 'Alto Biobío',
        //     provincia: 'Biobio',
        //     region: 'Bío Bío',
        //     predeterminado: null,
        //     createdAt: 2022-08-22T13:54:46.467Z,
        //     updatedAt: 2022-09-26T15:24:33.518Z
        //   }
        const { costoEnviame } = req.body
        const { calleNombre, calleNumero, ciudad, pisoOficinaDepto } = direccion.rows[0].dataValues

        //dimensiones del paquete total

        const altocm = dimensions[0]
        const largocm = dimensions[0]
        const anchocm = dimensions[0]
        const volumenM3 = (altocm * largocm * anchocm) / 1000000;
        const pesoPagar = dimensions[1] //no
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
                ordenPedido: `O-${ordenPedido}`
            });

            //guardar y generar post para que aparezca el envio en plataforma de ENVIAME:

            // const crearEnvioEnviame = await OrdenEnviame.create( //no es necesaria la constante :crearEnvioEnviame
            await OrdenEnviame.create(
                {
                    n_packages: 1,
                    content_description: 'telas, maquinas coser',
                    imported_id: `O-${ordenPedido}`,
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

            // const datosEnviame = crearEnvioEnviame.dataValues;
            // console.log("guradado en base de datos ordenEnviame: ", datosEnviame)
            // guradado en base de datos ordenEnviame:  {
            //   id: 20,
            //   n_packages: 1,
            //   content_description: 'telas, maquinas coser',
            //   imported_id: 'O-29092022-1218',
            //   order_price: 16725,
            //   weight: 1,
            //   volume: 0.027,
            //   type: 'delivery',
            //   width: 30,
            //   height: 30,
            //   length: 30,
            //   warehouse_code: '101',
            //   name: 'dj.vivanco@gmail.com',
            //   email: 'dj.vivanco@gmail.com',
            //   phone: '',
            //   place: 'Alto Biobío',
            //   full_address: 'Avenida Ralco Lepoy ',
            //   information: 'test enviame',
            //   carrier_code: 'BLX',
            //   carrier_service: '',
            //   tracking_number: '',
            //   updatedAt: 2022-09-29T15:19:13.171Z,
            //   createdAt: 2022-09-29T15:19:13.171Z
            // }


            var data = {
                "shipping_order": {
                    "n_packages": 1,
                    "content_description": "telas, maquinas coser",
                    "imported_id": `O-${ordenPedido}`,
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
                    // console.log("response.data es : ", response.data.data)
                    // response.data es :  {
                    //     identifier: 101082079,
                    //     imported_id: '123',
                    //     tracking_number: '7331808201',
                    //     status: {
                    //       id: 5,
                    //       name: 'Listo para despacho',
                    //       code: 'CREATED',
                    //       info: 'Ya creamos tu envío en: BLUEXPRESS  - ',
                    //       created_at: '2022-09-29 08:26:30'
                    //     },
                    //     customer: {
                    //       full_name: 'david vivanco',
                    //       phone: '921630936',
                    //       email: 'desarrollowebdavid@gmail.com'
                    //     },
                    //     shipping_address: {
                    //       full_address: 'Poza Azul 3074, Marga Marga, Quilpué, Chile',
                    //       place: 'Quilpué',
                    //       type: 'home'
                    //     },
                    //     country: 'CL',
                    //     carrier: 'BLUEXPRESS',
                    //     service: 'priority',
                    //     label: {
                    //       PDF: 'https://storage.googleapis.com/carrier-deliveries/202209/101082079/6209175-label.pdf',   
                    //       ZPL: null,
                    //       PNG: null
                    //     },
                    //     barcodes: '7331808201',
                    //     deadline_at: 'No informada.',
                    //     created_at: '2022-09-29 08:26:29',
                    //     updated_at: '2022-09-29 08:26:31',
                    //     links: [
                    //       {
                    //         rel: 'self',
                    //         href: 'https://api.enviame.io/api/s2/v2/deliveries/101082079'
                    //       },
                    //       {
                    //         rel: 'tracking',
                    //         href: 'https://api.enviame.io/api/s2/v2/deliveries/101082079/tracking'
                    //       },
                    //       {
                    //         rel: 'tracking-web',
                    //         href: 'https://api.enviame.io/s2/companies/8706/deliveries/101082079/tracking'
                    //       }
                    //     ]
                    //   }


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

                })
                .catch(function (error) {
                    console.log("error en axios", error);
                });
        };

    }


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

    //{
    // console.log("el user es y datso: ", cliented[0].)
    // el user es y datso:  [
    //     user { //la genera automaticamente
    //       dataValues: {
    //         id: 1,
    //         token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJkai52aXZhbmNvQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2NDQ2NzQyMCwiZXhwIjoxNjY0NDcwMTIwfQ.egxjUoC0hVXQphivzNmiGKtLtC26wwjLgVETMZ0q8Ks',
    //         tokenExpirado: null,
    //         email: 'dj.vivanco@gmail.com',
    //         password: '$2b$10$Zpuu5TMCuvBTIWUWxAlanOHr8FTPfVCKQSEBeOV0Vx4/l9LOR3CcC',
    //         role: 'admin',
    //         statusEmail: 'confirmed',
    //         nombre: 'David vivanco p',
    //         rut: '14552042-8',
    //         telefono: '921630936',
    //         direccion: 'poza azuil 546546',
    //         telefonoRecibe: null,
    //         direccionDespacho: null,
    //         createdAt: 2022-07-10T19:52:11.740Z,
    //         updatedAt: 2022-09-29T16:03:40.052Z
    //       },
    //       _previousDataValues: { etc, etc david jaja
    //}

    //crear nuevo item en carrito donde este el valor de enviame si existe



    // update Carrito con sesion y orden del pedido generado en el pago de backend
    await Carrito.update(
        {
            sesion: sessionId,
            ordenPedido: `O-${ordenPedido}`
        },
        { where: { cliente: email, ordenPedido: '' } }
    );


    //TODO generar la orden de carga y enviar o avisar a Dieter Admin
    // console.log("datos de compra a guardar para PREPARAR PEDIDO: ", req.body)
    // {
    //     datosCompra: {
    //         token: '01ab616447ff5a92c7b3f9335f6ca62ac9d25a1166d902087c63c5194de408b6',
    //         commitResponse: {
    //             vci: 'TSY',
    //             amount: 16424,
    //             status: 'AUTHORIZED',
    //             buy_order: '28092022-1800',
    //             session_id: '2022-09-28T18:00:05-03:00',
    //             card_detail: [Object],
    //             accounting_date: '0928',
    //             transaction_date: '2022-09-28T21:00:03.444Z',
    //             authorization_code: '1415',
    //             payment_type_code: 'VD',
    //             response_code: 0,
    //             installments_number: 0
    //         }
    //     },
    //     costoEnviame: 10024,
    //     detalleCompra: {

    //         valido: true,

    //         tipoEntrega: '2',
    //         tienda: '',
    //         quienRetira: '',
    //         rutRetira: '',
    //         nombreRetira: '',
    //         DomicilioId: 18,
    //         quienRecibe: '1',
    //         rutRecibe: '',
    //         nombreRecibe: '',
    //         tipoDoc: '1',
    //         tipoDatosFA: '',
    //         rutFA: '',
    //         razonFA: '',
    //         giroFA: '',
    //         telFA: '',

    //         totalaPagar: 6400,
    //         tipo: 'tarjeta',
    //         idsProductos: [379],
    //         costoEnviame: 10024,
    //         totalmasEnviame: 16424,
    //         dimensions: [38, 14, 2]
    //     },
    //     email: 'dj.vivanco@gmail.com',
    //     role: 'admin'
    // }



    const {
        idsProductos,
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

    await Ordenes.create({
        orden: `O-${ordenPedido}`,
        email,
        idsProductos: idsProductos.toString(),
        tipoEntrega,
        tienda,
        quienRetira,
        rutRetira,
        nombreRetira,
        DomicilioId,
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

    res.status(200).json({ message: 'ok', image: req.body });

}