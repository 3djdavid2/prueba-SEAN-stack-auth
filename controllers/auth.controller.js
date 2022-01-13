//AUTH TABLE
require('dotenv').config();
const jwt = require('jsonwebtoken');

miSecretKey = process.env.TOKEN_SECRET_KEY

exports.sign = async (req, res) => {
    
    emailF = req.body.email
    
    const token = jwt.sign({ _id: emailF }, miSecretKey);

    return res.json({ token });

}


