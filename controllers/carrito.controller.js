
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



// getCarritosPendiente

exports.getCarritos = async (req, res) => {
    email = req.body.email
    const carrito = await Carrito.findAndCountAll({

        where: { cliente: email, ordenPedido: '' }
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



//Actualizar cantidad de un producto del carrito

exports.updateCarrito = async (req, res) => {

    console.log(req.body)
    const { id, cantidad, total } = req.body

    const carrito = await Carrito.update(

        {
            cantidad: cantidad,
            total: total

        },
        { where: { id: id } }
    );

    res.status(200).json(carrito)

}


//Eliminar producto de Carrito
exports.deleteCarrito = async (req, res) => {

    const id = req.params.id;

    const deletedProdCarrito = await Carrito.destroy(
        {
            where: { id: id }
        });

    try {
        if (deletedProdCarrito === 1) {
            res.send({ message: "Producto Borrado" })
        }
        res.send({ message: "Producto No Borrado" })
    } catch (error) {
        console.log(error)
    }

}