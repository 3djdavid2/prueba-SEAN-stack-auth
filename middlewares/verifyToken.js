const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized Request');
    }

    const token = req.headers.authorization.split(' ')[1]

    try {

        if (token === 'null') {
            return res.status(401).send('Unauthorized Request');
        }

        const payload = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
        console.log("token ok, pasamos al controller")
        req.body.email = payload._id;
        req.body.role = payload.role;

        next();

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(400).json({ error: 'token no es válido ex' })
        }
        res.status(400).json({ error: 'token no es válido' })
    }
}

module.exports = verifyToken

