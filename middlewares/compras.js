
const User = require('../models/users')

//CONSULTAR SI EXISTE EL EMAIL EN BD SQLITE
const findUserByEmail = async (req, res, next) => {

    const user = await User.findAll(
        {
            raw: true,
            where: {
                email: req.body.email
            }
        }
    )

    // console.log("El user encontrado aqui:", user[0].nombre) 
    if (user.length != 0) {
        req.body.name = user[0].nombre
        req.body.phone = user[0].telefono
    } else {

        req.body.name = null
        req.body.phone = null
    }

    next()

};

module.exports = {
    findUserByEmail
}