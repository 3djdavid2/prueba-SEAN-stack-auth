const express= require('express');
const app= express();
const morgan = require('morgan')
const cors = require('cors')
const path= require('path');
require('dotenv').config();

//sequelize ORM
const sequelize= require('./database.js');
const { createRoles, createEstadoPedido} = require('./libs/initialSetup.js');
const { Products }= require('./models/products')
const { Marca }= require('./models/marca')
const { Categoria }= require('./models/categoria')
const { DireccionesClientes }= require('./models/direccionesCliente')
const { Tiendas }= require('./models/tiendas')
sequelize.sync().then(() => console.log('db is ready'));
//force true elimina las celdas con informacion, no usar en production!!!!!
// sequelize.sync({force:true}).then(() => console.log('db is ready'));

//para que re.body no entregue Undefined como respuesta del post solicitado
app.use(express.json());
port=process.env.PORT

const corsOptions = {
    origin: '*', // Reemplazar con dominio
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

createRoles();//creacion de modelo de roles si no existen en bd: admin, moderator, user.
createEstadoPedido();//creacion de modelo estados de los pedidos, enviado, cancelado, etc.
Products;
Marca;
Categoria;
DireccionesClientes;
Tiendas;

app.use(morgan('dev'));

app.use('/uploads', express.static(path.resolve('uploads')));
app.use(express.static('./public'));

//todas las rutas empiezan con auth o product
app.use('/api/auth', require('./routes/auth'))
app.use('/api/carrito', require('./routes/carrito'))
app.use('/api/compras', require('./routes/compras'))
app.use('/api/send-email', require('./routes/contactoForm'))
app.use('/api/perfil', require('./routes/perfil'))
app.use('/api/direcciones', require('./routes/direccionesClientes'))
app.use('/api/product', require('./routes/product'))
app.use('/api/sucursales', require('./routes/sucursales'))
app.use('/api/transferencia', require('./routes/transferencia'))


app.listen(port);
console.log('Server on port', port);

