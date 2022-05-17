const { compararPass } = require('../helpers/handleBcrypt.js')
const { consultarBD, registrarBD } = require('./existBD.js')
const { getToken } = require('../config/jwt.config')


//MIDDLEWERE signin ACCEDER A MI CUENTA

const verifyEmailyPassword = async (req, res, next) => {

    emailF = req.body.email
    passwordF = req.body.password

    const user = await consultarBD(emailF);


    //SI EXISTE EMAIL:
    if (user !== null) {

        const verificacion = user.statusEmail;
        // console.log("el estado de verificacion es: ", verificacion)//***unconfirmed

        r_password = user.password
        const checkPassword = await compararPass(passwordF, r_password)

        if (checkPassword) {



            //ESTADO DE VERIFICACION POR EMAIL ANTERIOR:

            if (verificacion == 'unconfirmed') {//NO:Enviar al correo link

            } else {//SI: esta ok: enviar token al localStorage

                //GENERO TOKEN
                 token = getToken(emailF);
            }

        } else {
            //password incorrecta
            return res.status(400).json({ message: "No coincide password", verify: false })
        }

        //NO EXISTE EMAIL
    } else {
        await registrarBD(req.body);
        res.status(400).json({ message: "No existe email", verify: false })
        // return 
    }

    next();



}

module.exports = { verifyEmailyPassword }