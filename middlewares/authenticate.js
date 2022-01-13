const { compararPass } = require('../helpers/handleBcrypt.js')
const { consultarBD, registrarBD } = require('./existBD.js')

const verifyEmail = async (req, res, next) => {

    emailF = req.body.email

    const user = await consultarBD(emailF);

    if (user !== null) {
        return res.status(400).json({ message: "ya existe email en la bd", verify: false })
    }

    //no existe, se creará nuevo usuario de mail y password:

    await registrarBD(req.body);

    next();

}


//MIDDLEWERE signin ACCEDER A MI CUENTA

const verifyEmailyPassword = async (req, res, next) => {

    emailF = req.body.email
    passwordF = req.body.password

    const user = await consultarBD(emailF); 
   

    //si existe:
    if (user !== null) {

        r_password = user.password

        const checkPassword = await compararPass(passwordF, r_password)
        
        if (checkPassword) {
            
            next()

        } else {

            //password incorrecta
            return res.status(400).json({ message: "No coincide password", verify: false })
        }

    } else {
        return res.status(400).json({ message: "No existe email", verify: false })
    }



}

module.exports = { verifyEmail, verifyEmailyPassword }