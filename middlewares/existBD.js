const {encriptarPass} = require('../helpers/handleBcrypt')
const User = require('../models/users')

const registrarBD = async (datos) => {

    const passwordE = await encriptarPass(datos.password)
    // const fecha = new Date()

    const usuario = await User.create({
        email: datos.email,
        password: passwordE
    });

    const rol= usuario.dataValues.role
    const id= usuario.dataValues.id

    return true

};


//CONSULTAR SI EXISTE EN BD SQLITE
const consultarBD = async (email) => {

    const requestedEmail = email;
   
    const user = await User.findOne({
        where: {
            email: requestedEmail
        }
    })

    return user;

};

module.exports = {
    consultarBD,
    registrarBD
}