//PRODUCT TABLE
const Product = require('../models/products')

//Obtener por categoria

exports.getMarca = async (req, res) => {
    
    const products = await Product.findAll({
        where: {
           marca: 'asus'
        }
    });
    
    res.json(products);
}


