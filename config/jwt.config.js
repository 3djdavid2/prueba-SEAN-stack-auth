const jwt = require('jsonwebtoken');
require('dotenv').config();
const miSecretKey = process.env.TOKEN_SECRET_KEY

const getToken = (payload) => {

    return token = jwt.sign({ _id: payload }, miSecretKey, { expiresIn: '1h' });

}

const getTokenData = (token) => {

    
    let data = null;

    jwt.verify(token, miSecretKey, (err, decoded) => {

        if (err) {
            console.log('Error al obtener data del token');
        } else {

            data = decoded._id;

        }
    });

    return data;
}

module.exports = {
    getToken,
    getTokenData
}