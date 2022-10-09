//PRODUCT TABLE VISTA CLIENTE NO EDITA PRODUCTOS SOLO GET

const Product = require('../models/products')
const { Op } = require('sequelize');


//Devuelve la cantidad total de productos, ej: 100
exports.getProductsCount = async (req, res) => {

    const products = await Product.findAndCountAll({
        where: {}
    });

    res.json(products.count);
}

//Obtener listado de algunos productos por pagina
exports.getProductsByPage = async (req, res) => {

    const products = await Product.findAndCountAll({
        where: {},
        limit: parseInt(req.query.pageSize),
        offset: parseInt(req.query.pageIndex),
        include: {
            all: true
        }

    });

    res.json(products);
}



//buscar productos por su nombre en Tienda (shop)
exports.findByNameProduct = async (req, res) => {

    const value = req.params.value;
    const product = await Product.findAndCountAll({
        where: { descripcion: { [Op.substring]: value } },
    });

    res.status(200).json(product)
}




//Obtener 1 solo producto por su id
exports.getProductById = async (req, res) => {
    const id = req.params.productId;
    const product = await Product.findOne({
        where: {
            id
        }
    });
    res.status(200).json(product)
}



