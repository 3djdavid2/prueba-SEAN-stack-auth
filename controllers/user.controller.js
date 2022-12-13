
const { consultarBD } = require('../middlewares/existBD');
const User = require('../models/users');


exports.confirm = async (req, res) => {
   
    try {
        // Obtener el token
        const  email = req.body.email;
       
       
        //si es nulo
        if (email === null) {
            return res.json({
                success: false,
                msg: 'Error al obtener data del token'
            });
        }

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
        if(process.env.ENV != 'production'){

            res.redirect('/confirm.html')
        }else{
            res.redirect('/api/confirm.html')
        }

        return



    } catch (error) {
        console.log("el error es", error);
        return res.json({
            success: false,
            msg: 'Error al confirmar usuario'
        });
    }
    

}


