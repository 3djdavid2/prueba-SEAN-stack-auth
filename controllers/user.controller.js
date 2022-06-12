const { getTokenData } = require('../config/jwt.config');
const { consultarBD } = require('../middlewares/existBD');
const User = require('../models/users');


const compruebaToken=async(req,res)=>{
    const token = req.headers.token
    
    return token
}

const confirm = async (req, res) => {

    try {
        // Obtener el token
        const { token } = req.params;

        // Verificar la data
        const email = getTokenData(token);
        if (email === null) {
            return res.json({
                success: false,
                msg: 'Error al obtener data del token'
            });
        }

        console.log("el token en user controller de email es: ", email)

        // Verificar existencia del usuario
        const user = await consultarBD(email);

        if (user === null) {
            return res.json({
                success: false,
                msg: 'Usuario no existe'
            });
        }

        // Actualizar usuario
        await User.update(
            { statusEmail: 'confirmed' },
            { where: { email: email } }
        )           

        
       // Redireccionar a la confirmación
       res.redirect('/confirm.html')
    
      return



    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            msg: 'Error al confirmar usuario'
        });
    }
}


module.exports = {
    compruebaToken,
    confirm
}