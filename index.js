const express= require('express');
const app= express();
const morgan = require('morgan')
const cors = require('cors')
const path= require('path');

//sequelize ORM
const sequelize= require('./database.js');
const { createRoles } = require('./libs/initialSetup.js');
sequelize.sync().then(() => console.log('db is ready'));

//para que re.body no entregue Undefined como respuesta del post solicitado
app.use(express.json());

const corsOptions = {
    origin: '*', // Reemplazar con dominio
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

createRoles();
app.use(morgan('dev'));

app.use('/uploads', express.static(path.resolve('uploads')));


//todas las rutas empiezan con auth o product
app.use('/api/auth', require('./routes/auth'))

app.use('/api/product', require('./routes/product'))

app.use('/api/categoria', require('./routes/categoria'))

app.use('/api/marca', require('./routes/marca'))


app.listen(3000);
console.log('Server on port', 3000);

