const express= require('express');
const app= express();
const morgan = require('morgan')
const cors = require('cors')
const path= require('path');
require('dotenv').config();

//sequelize ORM
const sequelize= require('./database.js');
const { createRoles, createEstadoPedido} = require('./libs/initialSetup.js');
sequelize.sync().then(() => console.log('db is ready'));

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

app.use(morgan('dev'));

app.use('/uploads', express.static(path.resolve('uploads')));
app.use(express.static('./public'));

//todas las rutas empiezan con auth o product
app.use('/api/auth', require('./routes/auth'))
app.use('/api/categoria', require('./routes/categoria'))
app.use('/api/marca', require('./routes/marca'))
app.use('/api/product', require('./routes/product'))
app.use('/api/perfil', require('./routes/perfil'))
app.use('/api/carrito', require('./routes/carrito'))
app.use('/api/compras', require('./routes/compras'))


app.listen(port);
console.log('Server on port', port);

