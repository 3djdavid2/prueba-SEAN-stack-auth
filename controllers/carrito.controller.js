const Product = require('../models/products')
const Carrito = require('../models/carrito')
const { Op } = require('sequelize');


//Crear producto a la base de datos
exports.createCarrito = async (req, res) => {
    //aqui llega en req el productId y la cantidad a comprar
    const {
        productoId,
        codigo,
        producto,
        precioOriginal,
        precio,
        cantidad,
        total,
        email,
    } = req.body

    carritoSave = await Carrito.create({

        cliente: email,
        productoId,
        codigo,
        producto,
        precioOriginal,
        precio,
        cantidad,
        total,
        sesion: '',
        ordenPedido: '',

    });

    res.status(201).json(carritoSave)
}

// getCarritos by Admin role
exports.getAllCarritos = async (req, res) => {

    email = req.body.email
    role = req.body.role
    let alls= []

    if(role == 'admin'){
        alls = await Carrito.findAll({
            raw: true,
            where: { }
        });
    }

    res.status(200).json(alls)
}


exports.getCarritos = async (req, res) => {

    email = req.body.email
    role = req.body.role

    //BUSCA carritos PENDIENTES DE PAGO o ABANDONADOS
    const carrito = await Carrito.findAll({
        raw: true,
        where: { cliente: email, ordenPedido: '' }
    });


    res.status(200).json(carrito)

}


//Obtener 1 solo carrito por su nº de orden
exports.getCarritoByOrder = async (req, res) => {

    const ordenPedido = req.params.id;
    const carrito = await Carrito.findAll({
        where: {
            ordenPedido: ordenPedido
        }
    });
    res.status(200).json(carrito)
}



//Actualizar cantidad de un producto del carrito

exports.updateCarrito = async (req, res) => {

    const { id, codigo, precioOriginal, precio, cantidad, total } = req.body

    const carrito = await Carrito.update(

        {
            codigo: codigo,
            precioOriginal: precioOriginal,
            precio: precio,
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

    const carrito = await Carrito.destroy(
        {
            where: { id: id }
        }
    )

    res.status(200).json({ data: carrito })

}