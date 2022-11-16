const {encriptarPass} = require('../helpers/handleBcrypt')
const User = require('../models/users')


const saveTokenBD = async (email, token, socketId) => {

    const user = await User.update(

        {
            token: token,
            socketId: socketId,
            estadoSocket: 'conectado'
            
        },
        { where: { email: email } }
    );

    return 
    

};




const registrarBD = async (datos) => {

    const passwordE = await encriptarPass(datos.password)
   
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