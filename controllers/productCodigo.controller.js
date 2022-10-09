//PRODUCT TABLE VISTA CLIENTE NO EDITA PRODUCTOS SOLO GET

const Product = require('../models/products')


//Obtener  solo producto por su codigo
exports.getProductByCodigo = async (req, res) => {

   

    const codigo = req.params.codigo;
    
    const product = await Product.findAndCountAll({
        where: {
            codigo
        }
    });
    res.status(200).json(product)
}


