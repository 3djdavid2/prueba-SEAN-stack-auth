
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
    // key: fs.readFileSync('/etc/letsencrypt/live/www.patronatotelas.cl/privkey.pem'),
    // cert: fs.readFileSync('/etc/letsencrypt/live/www.patronatotelas.cl/cert.pem'),
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

var cookieParser = require("cookie-parser");
const morgan = require('morgan')

const path = require('path');

var favicon = require("serve-favicon");
const fs = require('fs')

//sequelize ORM
const sequelize = require('./database.js');

const { createRoles, createEstadoPedido } = require('./libs/initialSetup.js');

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

const port = process.env.PORT

sequelize.sync().then(() => console.log('db is ready'));
//force true elimina las celdas con informacion, no usar en production!!!!!
// sequelize.sync({force:true}).then(() => console.log('db is ready'));

//para que re.body no entregue Undefined como respuesta del post solicitado
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(express.json());
app.use(cookieParser());
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

//************************************************************** */SOCKET WEBPAY PLUS****

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


exports.io = io;


//************************************* */

createRoles();//creacion de modelo de roles si no existen en bd: admin, moderator, user.
createEstadoPedido();//creacion de modelo estados de los pedidos, enviado, cancelado, etc.

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

app.use(morgan('dev'));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use('/uploads', express.static(path.resolve('uploads')));
// app.use(express.static('./public'));
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

//CONECTION SOCKET ***********************************************************************

io.on('connection', (socket) => {
    console.log("conectado a socket patronato telas=> handshake: ", socket.id)

    socketMap.push(socket);
    socket.emit('test', { "id": socket.id })  

    // * Si un dispositivo se desconecto lo detectamos aqui
    socket.on('disconnect', function () {
        console.log('user disconnected', socket.id);
    });

})

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
        //
        // for socketMapObj of socketMap:> Socket {
        //     _events: [Object: null prototype] {},
        //     _eventsCount: 0,
        //     _maxListeners: undefined,
        //     nsp: <ref *1> Namespace {
        //       _events: [Object: null prototype] { connection: [Function (anonymous)] },
        //       _eventsCount: 1,
        //       _maxListeners: undefined,
        //       sockets: Map(2) {
        //         'cQM2RdXk_EBkD6QoAAAD' => [Socket],
        //         '6qzZuy8xExJxwYFKAAAF' => [Socket]
        //       },
        //       _fns: [],
        //       _ids: 0,
        //       server: Server {
        //         _events: [Object: null prototype] {},
        //         _eventsCount: 0,
        //         _maxListeners: undefined,
        //         _nsps: [Map],
        //         parentNsps: Map(0) {},
        //         _path: '/socket.io',
        //         clientPathRegex: /^\/socket\.io\/socket\.io(\.msgpack|\.esm)?(\.min)?\.js(\.map)?(?:\?|$)/,     
        //         _connectTimeout: 45000,
        //         _serveClient: true,
        //         _parser: [Object],
        //         encoder: Encoder {},
        //         _adapter: [class Adapter extends EventEmitter],
        //         sockets: [Circular *1],
        //         opts: [Object],
        //         eio: [Server],
        //         httpServer: [Server],
        //         engine: [Server],
        //         [Symbol(kCapture)]: false
        //       },
        //       name: '/',
        //       adapter: Adapter {
        //         _events: [Object: null prototype] {},
        //         _eventsCount: 0,
        //         _maxListeners: undefined,
        //         nsp: [Circular *1],
        //         rooms: [Map],
        //         sids: [Map],
        //         encoder: Encoder {},
        //         [Symbol(kCapture)]: false
        //       },
        //       [Symbol(kCapture)]: false
        //     },
        //     client: Client {
        //       sockets: Map(0) {},
        //       nsps: Map(0) {},
        //       server: Server {
        //         _events: [Object: null prototype] {},
        //         _eventsCount: 0,
        //         _maxListeners: undefined,
        //         _nsps: [Map],
        //         parentNsps: Map(0) {},
        //         _path: '/socket.io',
        //         clientPathRegex: /^\/socket\.io\/socket\.io(\.msgpack|\.esm)?(\.min)?\.js(\.map)?(?:\?|$)/,     
        //         _connectTimeout: 45000,
        //         _serveClient: true,
        //         _parser: [Object],
        //         encoder: Encoder {},
        //         _adapter: [class Adapter extends EventEmitter],
        //         sockets: [Namespace],
        //         opts: [Object],
        //         eio: [Server],
        //         httpServer: [Server],
        //         engine: [Server],
        //         [Symbol(kCapture)]: false
        //       },
        //       conn: Socket {
        //         _events: [Object: null prototype] {},
        //         _eventsCount: 0,
        //         _maxListeners: undefined,
        //         id: 'AO-eMjOcobMgtcyBAAAA',
        //         server: [Server],
        //         upgrading: false,
        //         upgraded: true,
        //         _readyState: 'closed',
        //         writeBuffer: [],
        //         packetsFn: [],
        //         sentCallbackFn: [],
        //         cleanupFn: [],
        //         request: [IncomingMessage],
        //         protocol: 4,
        //         remoteAddress: '::1',
        //         checkIntervalTimer: null,
        //         upgradeTimeoutTimer: null,
        //         pingTimeoutTimer: Timeout {
        //           _idleTimeout: -1,
        //           _idlePrev: null,
        //           _idleNext: null,
        //           _idleStart: 2142,
        //           _onTimeout: null,
        //           _timerArgs: undefined,
        //           _repeat: null,
        //           _destroyed: true,
        //           [Symbol(refed)]: true,
        //           [Symbol(kHasPrimitive)]: false,
        //           [Symbol(asyncId)]: 58,
        //           [Symbol(triggerId)]: 57
        //         },
        //         pingIntervalTimer: Timeout {
        //           _idleTimeout: -1,
        //           _idlePrev: null,
        //           _idleNext: null,
        //           _idleStart: 2127,
        //           _onTimeout: null,
        //           _timerArgs: undefined,
        //           _repeat: null,
        //           _destroyed: true,
        //           [Symbol(refed)]: true,
        //           [Symbol(kHasPrimitive)]: false,
        //           [Symbol(asyncId)]: 28,
        //           [Symbol(triggerId)]: 0
        //         },
        //         transport: [WebSocket],
        //         [Symbol(kCapture)]: false
        //       },
        //       encoder: Encoder {},
        //       decoder: Decoder { _callbacks: {} },
        //       id: 'AO-eMjOcobMgtcyBAAAA',
        //       onclose: [Function: bound onclose],
        //       ondata: [Function: bound ondata],
        //       onerror: [Function: bound onerror],
        //       ondecoded: [Function: bound ondecoded],
        //       connectTimeout: undefined
        //     },
        //     data: {},
        //     connected: false,
        //     acks: Map(0) {},
        //     fns: [],
        //     flags: {},
        //     server: <ref *2> Server {
        //       _events: [Object: null prototype] {},
        //       _eventsCount: 0,
        //       _maxListeners: undefined,
        //       _nsps: Map(1) { '/' => [Namespace] },
        //       parentNsps: Map(0) {},
        //       _path: '/socket.io',
        //       clientPathRegex: /^\/socket\.io\/socket\.io(\.msgpack|\.esm)?(\.min)?\.js(\.map)?(?:\?|$)/,       
        //       _connectTimeout: 45000,
        //       _serveClient: true,
        //       _parser: {
        //         protocol: 5,
        //         PacketType: [Object],
        //         Encoder: [class Encoder],
        //         Decoder: [class Decoder extends Emitter]
        //       },
        //       encoder: Encoder {},
        //       _adapter: [class Adapter extends EventEmitter],
        //       sockets: <ref *1> Namespace {
        //         _events: [Object: null prototype],
        //         _eventsCount: 1,
        //         _maxListeners: undefined,
        //         sockets: [Map],
        //         _fns: [],
        //         _ids: 0,
        //         server: [Circular *2],
        //         name: '/',
        //         adapter: [Adapter],
        //         [Symbol(kCapture)]: false
        //       },
        //       opts: { requestCert: false, rejectUnauthorized: false, cors: [Object] },
        //       eio: Server {
        //         _events: [Object: null prototype],
        //         _eventsCount: 1,
        //         _maxListeners: undefined,
        //         clients: [Object],
        //         clientsCount: 2,
        //         opts: [Object],
        //         corsMiddleware: [Function: corsMiddleware],
        //         ws: [WebSocketServer],
        //         [Symbol(kCapture)]: false
        //       },
        //       httpServer: Server {
        //         maxHeaderSize: undefined,
        //         insecureHTTPParser: undefined,
        //         _events: [Object: null prototype],
        //         _eventsCount: 5,
        //         _maxListeners: undefined,
        //         _connections: 3,
        //         _handle: [TCP],
        //         _usingWorkers: false,
        //         _workers: [],
        //         _unref: false,
        //         allowHalfOpen: true,
        //         pauseOnConnect: false,
        //         httpAllowHalfOpen: false,
        //         timeout: 0,
        //         keepAliveTimeout: 5000,
        //         maxHeadersCount: null,
        //         maxRequestsPerSocket: 0,
        //         headersTimeout: 60000,
        //         requestTimeout: 0,
        //         _connectionKey: '6::::3001',
        //         [Symbol(IncomingMessage)]: [Function: IncomingMessage],
        //         [Symbol(ServerResponse)]: [Function: ServerResponse],
        //         [Symbol(kCapture)]: false,
        //         [Symbol(async_id_symbol)]: 6
        //       },
        //       engine: Server {
        //         _events: [Object: null prototype],
        //         _eventsCount: 1,
        //         _maxListeners: undefined,
        //         clients: [Object],
        //         clientsCount: 2,
        //         opts: [Object],
        //         corsMiddleware: [Function: corsMiddleware],
        //         ws: [WebSocketServer],
        //         [Symbol(kCapture)]: false
        //       },
        //       [Symbol(kCapture)]: false
        //     },
        //     adapter: <ref *3> Adapter {
        //       _events: [Object: null prototype] {},
        //       _eventsCount: 0,
        //       _maxListeners: undefined,
        //       nsp: <ref *1> Namespace {
        //         _events: [Object: null prototype],
        //         _eventsCount: 1,
        //         _maxListeners: undefined,
        //         sockets: [Map],
        //         _fns: [],
        //         _ids: 0,
        //         server: [Server],
        //         name: '/',
        //         adapter: [Circular *3],
        //         [Symbol(kCapture)]: false
        //       },
        //       rooms: Map(2) {
        //         'cQM2RdXk_EBkD6QoAAAD' => [Set],
        //         '6qzZuy8xExJxwYFKAAAF' => [Set]
        //       },
        //       sids: Map(2) {
        //         'cQM2RdXk_EBkD6QoAAAD' => [Set],
        //         '6qzZuy8xExJxwYFKAAAF' => [Set]
        //       },
        //       encoder: Encoder {},
        //       [Symbol(kCapture)]: false
        //     },
        //     id: '2hLQ3Nv8b_xVmzDIAAAC',
        //     handshake: {
        //       headers: {
        //         host: 'localhost:3001',
        //         connection: 'keep-alive',
        //         'sec-ch-ua': '"Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"',
        //         accept: '*/*',
        //         'sec-ch-ua-mobile': '?0',
        //         'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) 
        //   Chrome/105.0.0.0 Safari/537.36',
        //         'sec-ch-ua-platform': '"Windows"',
        //         origin: 'http://localhost:5200',
        //         'sec-fetch-site': 'same-site',
        //         'sec-fetch-mode': 'cors',
        //         'sec-fetch-dest': 'empty',
        //         referer: 'http://localhost:5200/',
        //         'accept-encoding': 'gzip, deflate, br',
        //         'accept-language': 'es-ES,es;q=0.9,en;q=0.8'
        //       },
        //       time: 'Wed Oct 05 2022 11:18:22 GMT-0300 (hora de verano de Chile)',
        //       address: '::1',
        //       xdomain: true,
        //       secure: false,
        //       issued: 1664979502272,
        //       url: '/socket.io/?payload=patronatotelas&EIO=4&transport=polling&t=OEeWm3I',
        //       query: [Object: null prototype] {
        //         payload: 'patronatotelas',
        //         EIO: '4',
        //         transport: 'polling',
        //         t: 'OEeWm3I'
        //       },
        //       auth: {}
        //     },
        //     [Symbol(kCapture)]: false
        //   }
        socketMapObj.emit('actualizaPrecio', newPrecio);        
    }
}


server.listen(port, () => {
    console.log("socket y server listos y escuchando por el puerto", port)
})



module.exports = app