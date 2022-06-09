const {encriptarPass} = require('../helpers/handleBcrypt')
const User = require('../models/users')


const saveTokenBD = async (email, token) => {

    const user = await User.findOne({ where: { email: email } });

    user.token = token
    await user.save()

    return
    

};




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


//CONSULTAR SI EXISTE EL EMAIL EN BD SQLITE
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
    registrarBD,
    saveTokenBD,

}