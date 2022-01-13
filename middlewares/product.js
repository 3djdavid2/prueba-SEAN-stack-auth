const Product = require('../models/products')

const actualiza = async (req, res, next) => {

    const id = req.params.productId;
    const product = await Product.findOne({ where: { id } });

    product.precio = req.body.precio;
    await product.save()

    next();
    
}

module.exports = actualiza;