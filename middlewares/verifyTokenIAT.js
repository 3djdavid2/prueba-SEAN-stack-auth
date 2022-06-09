const jwt = require('jsonwebtoken');

const verifyTokenIAT = async (req, res, next) => {

    if (!req.headers.token) {
        return res.status(401).send('No existe token en req iat');
    }

    const token = req.headers.token

    try {

        if (token === 'null') {
            return res.status(401).send('Unauthorized Request');
        }

        const payload =  jwt.verify(token, process.env.TOKEN_SECRET_KEY)

        console.log("payuload verify del token es ", payload)

        next();

    } catch (error) {
        console.log(error)
        if (error.name === 'TokenExpiredError'){
            return  res.status(401).json({error: 'token no es válido'})  
          }
        res.status(400).json({error: 'token no es válido'})     
    }
}

module.exports = verifyTokenIAT