//PRODUCT TABLE
const Product = require('../models/products')

//Obtener por categoria

exports.getCategoria = async (req, res) => {
    
    const products = await Product.findAll({
        where: {
            familia: 'papeleria'
        }
    });

    res.json(products);
}

