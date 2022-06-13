const jwt = require('jsonwebtoken');

const confirmToken = async (req, res, next) => {

    token= req.params.token
    
    try {

        if (token === 'null') {
            return res.status(401).send('Unauthorized Request');
        }

        const payload = jwt.verify(token, process.env.TOKEN_SECRET_KEY)

        req.body.email = payload._id;      
        req.body.role = payload.role;

        next();

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            //todo redirigir a pagina error
            return  res.status(400).json({ error: 'token no es válido ex' })
        }
        res.status(400).json({ error: 'token no es válido' })
    }
}

module.exports = { confirmToken };