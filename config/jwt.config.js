const jwt = require('jsonwebtoken');
require('dotenv').config();
const miSecretKey = process.env.TOKEN_SECRET_KEY

const createToken = (email, role) => {

    return token = jwt.sign({ _id: email, role:role}, miSecretKey, { expiresIn: '10m' });

}

const getTokenData = (token) => {

    
    let data = null;

    jwt.verify(token, miSecretKey, (err, payload) => {

        if (err) {
            console.log('Error al obtener data del token: ', err);
        } else {

            data = payload._id;

        }
    });

    return data;
}

module.exports = {
    createToken,
    getTokenData
}