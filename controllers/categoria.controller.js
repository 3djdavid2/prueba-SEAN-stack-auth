//PRODUCT TABLE
const Product = require('../models/products')

//Obtener por categoria

exports.getCategoria = async (req, res) => {

    const categorias = await Product.findAll({
        order:[
            ['categoria', 'ASC']
        ],
        attributes: ['categoria'],
        distinct: true

    });

    const uniqueCategoria= [...new Set(categorias.map(item=>item.categoria))];
    // console.log("las categorias son: ", uniqueCategoria);
    
    res.json(uniqueCategoria);
}

