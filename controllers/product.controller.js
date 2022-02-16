//PRODUCT TABLE
const Product = require('../models/products')

//Crear producto a la base de datos
exports.createProduct = async (req, res) => {
    const {nombre, categoria, categoriaId, marca, marcaId,descripcion, imgURL, codigo, precio, cantidad, estado } = req.body

    const productSave = await Product.create({
        
        nombre,
        categoria,
        categoriaId,
        marca,
        marcaId,
        descripcion,
        imgURL,
        codigo,
        precio,
        cantidad,
        estado
    });

    res.status(201).json(productSave)
}

//Devuelve la cantidad total de productos, ej: 100
exports.getProductsCount = async (req, res) => {

    const products = await Product.findAndCountAll({
        where: {}
    });

    res.json(products.count);
}

//Obtener listado de algunos productos por pagina
exports.getProductsByPage = async (req, res) => {

    // console.log("El req es: ",req.url);// respuesta es: /?pageIndex=1&pageSize=10
    // console.log("Offset de pageIndex es:", req.query.pageIndex);
    // console.log("limit de pageSize es:", req.query.pageSize);

    const products = await Product.findAndCountAll({
        where: {},
        limit: parseInt(req.query.pageSize),
        offset: parseInt(req.query.pageIndex)

    });

    res.json(products);
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



//Actualizar 1 solo producto (ej: su precio, estado-activo o inactivo- cantidad, etc)
exports.updateProductById = async (req, res) => {

    res.send('updated');

}


//Eliminar un producto
exports.deleteproductById = async (req, res) => {
    const id = req.params.productId;
    const deletedProduct = await Product.destroy({ where: { id } });
    try {
        if (deletedProduct === 1) {
            res.send({ message: "Borrado" })
        }
        // res.send({borrado: deletedProduct})//devuelce 1 si borra o 0 si no borra por no exister en bd
        res.send({ message: "No Borrado" })
    } catch (error) {
        console.log(error)
    }

}


