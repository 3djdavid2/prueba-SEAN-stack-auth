
const User = require('../models/users')

exports.getMisDatos = async (req, res) => {

    const email = req.body.email   

    const user = await User.findOne({
        where: {
            email: email
        }
    });

    const { nombre, rut, direccion, telefono,  id}= user

    res.status(200).json({nombre, rut, direccion, telefono,  id})
}



//Actualizar 
exports.updateMisDatos = async (req, res) => {

    const email = req.body.email
    const { nombre, rut, direccion, telefono } = req.body

    const user = await User.update(

        {
            nombre: nombre,
            rut: rut,
            direccion: direccion,
            telefono: telefono
        },
        { where: { email: email } }
    );

    res.status(200).json(user)
    // res.send('updated');//sintaxerror: Unexpected token u in JSON at position 0 at JSON.parse

}