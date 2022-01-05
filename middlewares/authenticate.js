const { compararPass } = require('../helpers/handleBcrypt')
const { consultarBD, registrarBD } = require('../database')

const verifyEmail = async (req, res, next) => {

    emailF = req.body.email

    const user = await consultarBD(emailF);


    if (user !== undefined) {
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
    console.log("user: ", user)
    val = JSON.stringify(user)
    console.log(val)

    //si existe:
    if (user !== undefined) {

        r_password = user.password


        const checkPassword = await compararPass(passwordF, r_password)
        console.log("pass:", checkPassword)
        if (checkPassword) {
            
            next()

        } else {

            //password incorrecta
            return res.status(400).json({ message: "No coincide password", verify: false })
        }

    } else {
        return res.status(400).json({ message: "No existe email", verify: false })
    }

    //si email existe en bd:



}

module.exports = { verifyEmail, verifyEmailyPassword }