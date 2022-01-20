const express= require('express');
const app= express();
const morgan = require('morgan')
const cors = require('cors')

//sequelize ORM
const sequelize= require('./database.js');
sequelize.sync().then(() => console.log('db is ready'));

//para que re.body no entregue Undefined como respuesta del post solicitado
app.use(express.json());

const corsOptions = {
    origin: '*', // Reemplazar con dominio
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));
app.use(morgan('dev'));

//todas las rutas empiezan con auth o product
app.use('/api/auth', require('./routes/auth'))
app.use('/api/product', require('./routes/product'))


app.listen(3000);
console.log('Server on port', 3000);

