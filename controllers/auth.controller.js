//AUTH TABLE
const jwt = require('jsonwebtoken');
require('dotenv').config();
const miSecretKey = process.env.TOKEN_SECRET_KEY

exports.sign = async (req, res) => {

    emailF = req.body.email

    const token = jwt.sign({ _id: emailF }, miSecretKey);

    res.json( {token} );

}


