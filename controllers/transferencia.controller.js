
const Transferencia = require('../models/transferencia')

//Crear producto a la base de datos
exports.createTransferencia = async (req, res) => {
    //aqui llega en req el productId y la cantidad a comprar


    const {
        productoId,
        producto,
        precio,
        cantidad,
        total,
        email,
    } = req.body

    transferenciaSave = await Transferencia.create({

        cliente: email,
        productoId,
        producto,
        precio,
        cantidad,
        total,
        sesion: '',
        ordenPedido: '',

    });

    res.status(201).json(transferenciaSave)
}



// get todas

exports.getTransferencia = async (req, res) => {
   
    const transferencia = await Transferencia.findAndCountAll({

        where: { }
    });
    res.status(200).json(transferencia)

}





//Actualizar cantidad de un producto del carrito

exports.updateTransferencia = async (req, res) => {

    console.log(req.body)
    const { id, cantidad, total } = req.body

    const transferencia = await Transferencia.update(

        {
            cantidad: cantidad,
            total: total

        },
        { where: { id: id } }
    );

    res.status(200).json(transferencia)

}


//Eliminar 
exports.deleteTransferencia = async (req, res) => {

    const id = req.params.id;

    const deletedTransferencia = await Transferencia.destroy(
        {
            where: { id: id }
        });

    try {
        if (deletedTransferencia === 1) {
            res.send({ message: "Borrado" })
        }
        res.send({ message: "No Borrado" })
    } catch (error) {
        console.log(error)
    }

}