
const Direccion = require('../models/direccionesCliente')

exports.getMisDatos = async (req, res) => {

    const email = req.body.email   

    const direccion = await Direccion.findAndCountAll({
        where: {
            clienteEmail: email
        }
    });

    res.status(200).json(direccion)
}



//Actualizar 
exports.updateMisDatos = async (req, res) => {

    const email = req.body.email
    const { nombre, rut, direccionId, telefono } = req.body

    const direccion = await Direccion.update(

        {
            nombre: nombre,
            rut: rut,
            direccion: direccion,
            telefono: telefono
        },
        { where: { clienteEmail: email } }
    );

    res.status(200).json(direccion)
    // res.send('updated');//sintaxerror: Unexpected token u in JSON at position 0 at JSON.parse

}