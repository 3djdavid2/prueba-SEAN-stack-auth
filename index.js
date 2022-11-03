const express = require('express');
const app = express();
require('dotenv').config();
const http = require('http');

const corsOptions = {
    origin: '*', // Reemplazar con dominio
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
const cors = require('cors')
app.use(cors(corsOptions));

const optionsServer = {

    requestCert: false,
    rejectUnauthorized: false
    ,
    path: '/chat/socket.io',
    cors: {
        origin: process.env.URL_SOCKET_ANG
    }
};
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, optionsServer);
exports.io = io;

var cookieParser = require("cookie-parser");
const morgan = require('morgan')
const path = require('path');

var favicon = require("serve-favicon");
const fs = require('fs')

const port = process.env.PORT

//sequelize ORM
const sequelize = require('./database.js');

const {
    createRoles,
    createTipoDocTributario,
    createTipoDatosFA,
    createTipoEntrega,
    createQuienRetiraTienda,
    createQuienRecibe,
    createEstadoPedido,
} = require('./libs/initialSetup.js');

const { Products } = require('./models/products')
const { Marca } = require('./models/marca')
const { Categoria } = require('./models/categoria')
const { DireccionesClientes } = require('./models/direccionesCliente')
const { Tiendas } = require('./models/tiendas')
const { OrdenEnviame } = require('./models/ordenEnviame')
const { RespuestaEnviame } = require('./models/respEnviame')
const { RespuestaTBK } = require('./models/respTBK')
const { Orden } = require('./models/orden')
const { Pago } = require('./models/pago')
const { Pack } = require('./models/packs')
const { PackMix } = require('./models/packs-mix')
const { Banner } = require('./models/banner')


sequelize.sync().then(() => console.log('db is ready'));
//force true elimina las celdas con informacion, no usar en production!!!!!
// sequelize.sync({force:true}).then(() => console.log('db is ready'));

//para que re.body no entregue Undefined como respuesta del post solicitado
var bodyParser = require('body-parser');
const User = require('./models/users.js');
const Ordenes = require('./models/orden');
const Carrito = require('./models/carrito.js');
app.use(bodyParser.json())
app.use(express.json());
app.use(cookieParser());
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(morgan('dev'));

//************************************************************** */SOCKET WEBPAY PLUS****

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//*************** */
createRoles();
createTipoDocTributario()
createTipoDatosFA()
createTipoEntrega()
createQuienRetiraTienda()
createQuienRecibe()
createEstadoPedido()
//***** */

Products;
Marca;
Categoria;
DireccionesClientes;
Tiendas;
RespuestaTBK;
OrdenEnviame
RespuestaEnviame
Orden
Pago
Pack
PackMix
Banner


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use('/uploads', express.static(path.resolve('uploads')));
app.use(express.static(path.join(__dirname, "public")));

// app.use("/", require('./routes/index'));
app.use('/api/webpay_plus', require('./routes/webpay_plus'));

//todas las rutas empiezan con auth o product
app.use('/api/auth', require('./routes/auth'))
app.use('/api/carrito', require('./routes/carrito'))
app.use('/api/compras', require('./routes/compras'))
app.use('/api/send-email', require('./routes/contactoForm'))
app.use('/api/perfil', require('./routes/perfil'))
app.use('/api/direcciones', require('./routes/direccionesClientes'))
app.use('/api/product', require('./routes/product'))
app.use('/api/productCodigo', require('./routes/productCodigo'))
app.use('/api/productcrud', require('./routes/productcrud'))
app.use('/api/orders', require('./routes/orders'))
app.use('/api/marcas', require('./routes/marcas'))
app.use('/api/categorias', require('./routes/categorias'))
app.use('/api/pack', require('./routes/pack'))
app.use('/api/sucursales', require('./routes/sucursales'))
app.use('/api/transferencia', require('./routes/transferencia'))
app.use('/api/cotizarDomicilio', require('./routes/cotizarDomicilio'))
app.use('/api/banner', require('./routes/banner'))

//CONECTION SOCKET INICIO ***********************************************************************

io.on('connection', (socket) => {

    let { payload, tokenValido } = socket.handshake.query;

    socketMap.push(socket);
    socket.emit('test', { "id": socket.id })

    // * Si un dispositivo se desconecto lo detectamos aqui
    socket.on('disconnect', async function () {
        console.log('user disconnected', socket.id);
        const user = await User.update(
            { estadoSocket: 'desconectado' },
            { where: { socketId: socket.id } }
        )
    });
});

var socketMap = [];

// SocketSingleton.on('connection', (socket) => {

//     //** handshake: Es el id de conexion con el dispositivo cliente */
//     const id_handshake = socket.id;
//     console.log("Client Connected id: ", id_handshake);
//     socketMap.push(socket);
//     dataUpdate();

//     /** handshake: Es el id de conexion con el dispositivo cliente */


//     /** query: En este ejemplo practico queremos enviar una información extra en la conexión
//      * acerca del usuario que esta logeado en el Front. Para ello lo enviamos dentro de un objeto por defecto llamado "query"
//      */
//     let { payload } = socket.handshake.query;


//     console.log(`Nuevo dispositivo conectado: ${id_handshake}`);

//     if (!payload) {

//         console.log(`Sin payload`);

//     } else {
//         payload = JSON.parse(payload)

//         /**
//          * Una vez enviado la informacion del usuario conectado en este caso es un peequeño objecto que contiene nombre y id,
//          * creamos una sala y lo unimos https://socket.io/docs/rooms-and-namespaces/
//          */
//         socket.join(`room_${payload.id}`);

//         console.log(`${(`El dispositivo ${id_handshake} se unio a -> ${`room_${payload.id}`}`)}`);

//         /**
//          * --------- EMITIR -------------
//          * Para probar la conexion con el dispositivo unico le emitimos un mensaje a el dispositivo conectado
//          */
//         socket.emit('evento', {
//             msg: `Hola tu eres el dispositivo ${id_handshake}, perteneces a la sala room_${payload.id}, de ${payload.user}`
//         });

//         /**
//          * ----------- ESCUCHAR -------------
//          * Cuando el cliente nos emite un mensaje la api los escucha de la siguiente manera
//          */
//         socket.on('evento', function (res) {
//             console.log("escuchando en back")
//             switch (res.event) {

//                 case 'clickAdminAng':
//                     /**
//                      * Si el evento que escucha es "message", se parsea la informacion recibida
//                      * y posteriormente se emite un "message" a todos los dispositivos unidos a la sala.
//                      */

//                     console.log("evento desde angular aqui")
//                     const inPayloadCookie = JSON.parse(res.cookiePayload);
//                     const inPayload = res.payload;

//                     io.to(`room_${inPayloadCookie.id}`).emit('evento', {
//                         msg: `Mensaje a todos los dispositivos de la sala room__${inPayloadCookie.id}: ${inPayload.message}`
//                     });

//                     break;
//                 default:
//                     /** Otros posibles casos */
//                     break;
//             }

//         });
//     };

//     /**
//      * Si un dispositivo se desconecto lo detectamos aqui
//      */
//     socket.on('disconnect', function () {
//         console.log('user disconnected');
//     });
// });

//todo revisar permiso solo de asdmmin
//ENDPOINT admin angular post service perfil

app.put('/api/precio', async (req, res) => {



    try {
        let newPrecio = (req.body.newPrecio);
        precioUpdate(newPrecio);
        res.status(201).json(newPrecio);

    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});
async function precioUpdate(newPrecio) {
    for (let socketMapObj of socketMap) {
        socketMapObj.emit('actualizaPrecio', newPrecio);
    }
};

app.put('/api/estado', async (req, res) => {

    const { orden, newEstado, email } = req.body
    //actualizar ordens por numero de orden
    const ordenes = await Ordenes.update(
        {
            status_name: newEstado
        },
        { where: { orden: orden } }
    )

    // console.log("result del update de orden a status_name:>", ordenes[0]) //da resultado 1

    //actualizar carrito por orden su estado para que lo vea el cliente
    const carrito = await Carrito.update(
        {estado: newEstado},
        {where:{ordenPedido: orden}}
    )

    console.log("carrito update estado orden:>", carrito[0])

    //buscar socketid por email
    const user = await User.findOne(
        {
            raw: true,
            where: { email }
        }
    );

    const { socketId, estadoSocket } = user

    try {
        estadoUpdate(socketId, newEstado, orden);
        res.status(201).json(newEstado);

    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

async function estadoUpdate(socketId, newEstado, orden) {
    io.to(socketId).emit('actualizaEstadoPedido', [{ newEstado: newEstado, orden: orden }]);
};

//CONECTION SOCKET FIN  ***********************************************************************

server.listen(port, () => {
    console.log("socket y server listos y escuchando por el puerto", port)
});

module.exports = app;