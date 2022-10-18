const jwt = require('jsonwebtoken');
require('dotenv').config();

const miSecretKey = process.env.TOKEN_SECRET_KEY

const createToken = (email, role) => {

    return token = jwt.sign({ _id: email, role:role}, miSecretKey, { expiresIn: '120m' });

}

module.exports = {
    createToken    
}