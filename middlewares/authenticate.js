const { compararPass } = require('../helpers/handleBcrypt.js')
const { consultarBD, registrarBD } = require('./existBD.js')
const { getToken } = require('../config/jwt.config')

//MIDDLEWERE signin ACCEDER A MI CUENTA

const verifyEmailyPassword = async (req, res, next) => {

    emailF = req.body.email
    passwordF = req.body.password
    clicksignin = req.headers.clicksignin //true
    const user = await consultarBD(emailF);

    //SI EXISTE EMAIL:
    if (user !== null) {

        if (clicksignin === 'true') {
            console.log("desde signin=true")
            //verifica pass:
            r_password = user.password
            const checkPassword = await compararPass(passwordF, r_password)

            if (checkPassword) {

                //GENERO TOKEN
                const token = getToken(emailF);

                //VERIFICO si existe verificado de email anterior en BD:
                const verificacion = user.statusEmail;

                if (verificacion === 'unconfirmed') {//Enviar al CORREO el link de url y token:

                    return res.json({ token: 'tomailconfirm' })

                } else {
                    //token al store ok next()
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
        if (clicksignin == 'true') {
            //reenvia a sign up:
            return res.json({ token: 'tosignup' })
        }

        //guarda en bd cliente nuevo
        await registrarBD(req.body);
        //genera TOKEN
        token = getToken(emailF)

        //Envia token y link al correo del cliente:

        return res.json({ token: 'tomailconfirm' })




    }



    next();

}

module.exports = { verifyEmailyPassword }

// res.status(400).json({ message: "No existe email", verify: false })