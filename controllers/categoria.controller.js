//PRODUCT TABLE
const Product = require('../models/products')

//Obtener por categoria

exports.getCategoria = async (req, res) => {

    const categoria = await Product.findAll({
        order:[
            ['familia', 'ASC']
        ],
        attributes: ['familia'],
        distinct: true

    });

    const uniqueCategoria= [...new Set(categoria.map(item=>item.familia))];
    console.log("las categorias son: ", uniqueCategoria);
    
    res.json(categoria);
}

