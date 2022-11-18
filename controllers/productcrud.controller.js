//PRODUCT TABLE ADMIN CRUD 
//*************************

const Product = require('../models/products')
const { Op } = require('sequelize');

//Crear producto a la base de datos
exports.createProduct = async (req, res) => {

    imgURL = req.body.Location
    let packTipo = ""
    data = JSON.parse(req.body.data)


    const {
        nombre, estado, packActivo, categoriaId, marcaId,
        descripcion, codigo, precio, precioPromo, cantidadPromo,
        inicioPromo, finPromo, cantidad, unidadMedida, unidMinVenta,
        largocm, anchocm, altocm, pesoKg } = data

    const productSave = await Product.create({

        nombre, estado, packActivo, categoriaId, marcaId,
        packTipo: packTipo, descripcion, codigo, precio, imgURL: imgURL,
        precioPromo, cantidadPromo, inicioPromo,
        finPromo, cantidad, unidadMedida, unidMinVenta,
        largocm, anchocm, altocm, pesoKg
    })

    res.status(201).json({ 'messageTest': "guardado ok" })
};

//Actualizar 1 solo producto (ej: su precio, estado-activo o inactivo- cantidad, etc)
exports.updateProdByCodigo = async (req, res) => {


    let precioPromo1
    let multiploLlevaPromo1


    if (req.body.updatePhoto == 'true') {

        const codigo = req.params.codigo
        const imgURL = req.body.Location
        const data = JSON.parse(req.body.data);


        if (!data.precioPromo) {
            precioPromo1 = 0
        } else {
            precioPromo1 = data.precioPromo
        }

        if (!data.multiploLlevaPromo) {
            multiploLlevaPromo1 = 1
        } else {
            multiploLlevaPromo1 = data.multiploLlevaPromo
        }

        const {
            nombre, estado, packTipo, packActivo, categoriaId,
            marcaId, descripcion, precio, multiploPagaPromo,
            cantidadPromo, inicioPromo, finPromo, cantidad, unidadMedida,
            unidMinVenta, largocm, anchocm, altocm, pesoKg
        } = data



        const updated = await Product.update(
            {
                estado, packActivo, packTipo, nombre, categoriaId,
                marcaId, descripcion, imgURL: imgURL, precio, precioPromo: precioPromo1, multiploLlevaPromo: multiploLlevaPromo1, multiploPagaPromo,
                cantidadPromo, inicioPromo, finPromo, cantidad, unidadMedida,
                unidMinVenta, largocm, anchocm, altocm, pesoKg
            },
            { where: { codigo: codigo } }
        );

        res.status(200).json({ message: updated });

    } else {

        //no se cambia url existente de photo de bd 

        const codigo = req.params.codigo

        data = JSON.parse(req.body.data);

        const {
            nombre, estado, packTipo, packActivo, categoriaId,
            marcaId, descripcion, precio, multiploPagaPromo,
            inicioPromo, finPromo, cantidad, unidadMedida, unidMinVenta,
            largocm, anchocm, altocm, pesoKg } = data

        //precioPromo y multiploLlevaPromo pueden venir undefined si estan disabled
        if (!data.precioPromo) {
            precioPromo1 = 0
        } else {
            precioPromo1 = data.precioPromo
        }

        if (!data.multiploLlevaPromo) {
            multiploLlevaPromo1 = 1
        } else {
            multiploLlevaPromo1 = data.multiploLlevaPromo
        }

        const updated = await Product.update(
            {
                estado, packActivo, packTipo, nombre, categoriaId,
                marcaId, descripcion, precio, precioPromo: precioPromo1,
                multiploLlevaPromo: multiploLlevaPromo1, multiploPagaPromo, inicioPromo, finPromo, cantidad, unidadMedida,
                unidMinVenta, largocm, anchocm, altocm, pesoKg
            },
            { where: { codigo: codigo } }
        );

        res.status(200).json({ message: updated });

    }
};



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



//buscar productos por su nombre **
exports.findByNameProduct = async (req, res) => {

    const value = req.params.value;
    const product = await Product.findOne({
        where: { codigo: value },
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


//Eliminar un producto
exports.deleteproductById = async (req, res) => {

    const id = req.params.productId;

    const deletedProduct = await Product.destroy(
        {
            where: { id }
        });

    res.status(200).json({ data: deletedProduct })

}