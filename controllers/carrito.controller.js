
const Carrito = require('../models/carrito')

//Crear producto a la base de datos
exports.createCarrito = async (req, res) => {
    //aqui llega en req el productId y la cantidad a comprar


    const {
        productoId,
        producto,
        precio,
        cantidad,
        total,
        email,
    } = req.body

    carritoSave = await Carrito.create({

        cliente: email,
        productoId,
        producto,
        precio,
        cantidad,
        total,
        sesion: '',
        ordenPedido: '',

    });

    res.status(201).json(carritoSave)
}



//Obtener listado de todos los carritos
exports.getCarritos = async (req, res) => {

    const carrito = await Carrito.findAndCountAll({
        where: {},
    });

    res.status(200).json(carrito)

}



//Obtener 1 solo carrito por su nº de orden
exports.getCarritoByOrder = async (req, res) => {

    const ordenPedido = req.params.ordenPedido;
    const carrito = await Carrito.findOne({
        where: {
            ordenPedido: ordenPedido
        }
    });
    res.status(200).json(carrito)
}



//Actualizar carrito por ordenId

exports.updateCarrito = async (req, res) => {
    const ordenPedido = req.params.ordenPedido;
    //todo

    res.send('updated');

}


//Eliminar carrito
exports.deleteCarrito = async (req, res) => {

    const ordenPedido = req.params.ordenPedido;

    const deletedCarrito = await Carrito.destroy(
        {
            where: { ordenPedido: ordenPedido }
        });

    try {
        if (deletedCarrito === 1) {
            res.send({ message: "Borrado" })
        }
        res.send({ message: "No Borrado" })
    } catch (error) {
        console.log(error)
    }

}