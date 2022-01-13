const {encriptarPass} = require('../helpers/handleBcrypt')
const User = require('../models/users')

const registrarBD = async (datos) => {

    const passwordE = await encriptarPass(datos.password)
    // const fecha = new Date()

    await User.create({
        email: datos.email,
        password: passwordE
    });

    return true

};


//CONSULAR SI EXISTE EN BD SQLITE
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