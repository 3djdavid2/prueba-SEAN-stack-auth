const { compararPass } = require('../helpers/handleBcrypt.js')
const { consultarBD, registrarBD, saveTokenBD } = require('./existBD.js')
const { createToken } = require('../config/jwt.config')
const { getTemplate, sendEmail } = require('../config/mail.config');

//MIDDLEWERE signin ACCEDER A MI CUENTA

const verifyEmailyPassword = async (req, res, next) => {

    socketId = req.body.socketId
    emailF = req.body.email
    passwordF = req.body.password
    clicksignin = req.headers.clicksignin //true

    const user = await consultarBD(emailF);

    //SI EXISTE usuario:
    if (user !== null) {

        if (clicksignin === 'true') {

            //verifica pass:
            r_password = user.password
            const checkPassword = await compararPass(passwordF, r_password)

            if (checkPassword) {

                //GENERO TOKEN
                const token = createToken(emailF, user.role);
                req.body.token = token

                //Guardo token en bd 
                await saveTokenBD(emailF, token, socketId);



                //VERIFICO si existe verificado de email anterior en BD:
                const verificacion = user.statusEmail;

                if (verificacion === 'unconfirmed') {//Enviar al CORREO el link de url y token:

                    //Envia token y link al correo del cliente: mail ya existe en base de datos, solo que no se confirmó
                    const template = getTemplate(emailF, token);
                    await sendEmail(emailF, 'Confirmar cuenta', template);

                    //AVISO EN SIGNIN QUE SE LE HA ENVIADO UN CORREO DE CONFIRMACION
                    return res.json({ token: 'tomailconfirm' })

                }


            } else {
                //password incorrecta
                return res.status(400).json({ message: "No coincide password", verify: false })
            }

        } else {
            //reenvia a signin ya que el mail existe:
            return res.json({ token: 'tosignin' })
        }




        //NO EXISTE EMAIL
    } else {
        if (clicksignin === 'true') {
            //reenvia a sign up:
            return res.json({ token: 'tosignup' })
        }

        //guarda en bd cliente nuevo
        await registrarBD(req.body);
        //genera TOKEN
        token = createToken(emailF)

        //Guardo token y socket en bd ***-*-*-*-*-*-*-*-*socket
        await saveTokenBD(emailF, token, socketId);

        //Envia token y link al correo del cliente:
        const template = getTemplate(emailF, token);

        // Enviar el email
        await sendEmail(emailF, 'Confirmar cuenta nueva', template);
        //Aviso al cliente que se le ha enviado un correo con link para confirmacion
        return res.json({ token: 'tomailconfirm' })

    }

    next();

}

module.exports = { verifyEmailyPassword };