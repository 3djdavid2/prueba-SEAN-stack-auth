
const Direction = require('../models/direccionesCliente')


exports.createDirection = async (req, res) => {

    const {
        alias,
        calleNombre,
        calleNumero,
        email,
        referencia,
        ciudad,
        provincia,
        region
    } = req.body

    const direccionSave = await Direction.create({
        clienteEmail: email,
        nombreDireccion: alias,
        calleNombre,
        calleNumero,
        pisoOficinaDepto: referencia,
        ciudad,
        provincia,
        region
    });

    res.status(201).json(direccionSave)

}


exports.getDirections = async (req, res) => {

    const email = req.body.email

    const direccion = await Direction.findAndCountAll({
        where: {
            clienteEmail: email
        }
    });

    res.status(200).json(direccion)
}



//Actualizar 
exports.updateDirection = async (req, res) => {

    
    const {
        id,
        alias,
        referencia,

    } = req.body

    const direccion = await Direction.update(

        {
            nombreDireccion: alias,
            pisoOficinaDepto: referencia,


        },
        { where: { id: id } }
    );

    // res.status(200).json({message : 'prueba respuesta'})
    res.status(200).json(direccion)
    // res.send('updated');//sintaxerror: Unexpected token u in JSON at position 0 at JSON.parse

};


//Eliminar una direccion por su id en boxDecorationBreak: 
exports.deleteDirection = async (req, res) => {

   
    const id = req.params.id;
    const deletedDirection= await Direction.destroy({ where: { id } });

    try {
        if (deletedDirection === 1) {
            res.send({ message: "Borrado" })
        }
        // res.send({borrado: deletedProduct})//devuelce 1 si borra o 0 si no borra por no exister en bd
        res.send({ message: "No Borrado" })
    } catch (error) {
        console.log(error)
    }

}