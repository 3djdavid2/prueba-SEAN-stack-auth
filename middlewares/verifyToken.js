const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized Request');
    }

    const token = req.headers.authorization.split(' ')[1]

    try {

        if (token === 'null') {
            return res.status(401).send('Unauthorized Request');
        }

        const payload = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
        req.body.email = payload._id;

        next();

    } catch (error) {
        res.status(400).json({error: 'token no es válido'})     
    }
}

module.exports = verifyToken
