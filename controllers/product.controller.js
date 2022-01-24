//PRODUCT TABLE
const Product = require('../models/products')

//Crear producto a la base de datos
exports.createProduct = async (req, res) => {
    const { nombre, familia, marca, descripcion, imgURL, codigo, precio, cantidad, estado } = req.body

    const productSave = await Product.create({
        nombre,
        familia,
        marca,
        descripcion,
        imgURL,
        codigo,
        precio,
        cantidad,
        estado
    });

    res.status(201).json(productSave)
}


//Obtener por categoria

exports.category = async (req, res) => {
categoria="papeleria"
    const products = await Product.findAll({
        where:{
            // familia:categoria
        }
    });
    res.json(products);
}




//Obtener listado de algunos productos por pagina
exports.getProductsByPage = async (req, res) => {
    
    
    const products = await Product.findAndCountAll({
        where:{},
        limit:10,
        offset:0        

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


