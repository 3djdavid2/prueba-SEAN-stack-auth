//PRODUCT TABLE
const Product = require('../models/products')

//Obtener por marca

exports.getMarca = async (req, res) => {
    
    const marcas = await Product.findAll({
        order:[
            ['marca', 'ASC']
        ],
        attributes: ['marca'],
        distinct: true
    });
    
    const uniqueMarcas= [...new Set(marcas.map(item=>item.marca))];
       
    res.json(uniqueMarcas);
}



