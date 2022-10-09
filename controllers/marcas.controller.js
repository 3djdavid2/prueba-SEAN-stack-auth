
const Marca = require('../models/marca')

//Crear 

exports.createMarca = async (req, res) => {    
  
    const { nombre} = req.body

    created = await Marca.create({
       nombre
    });

    res.status(201).json(created)
}



//Obtener todo

exports.getMarcas = async (req, res) => {
  
    const encontrado = await Marca.findAndCountAll({        
              where: {}
    });
    res.status(200).json(encontrado)

}



//Actualizar cantidad de un producto del carrito

exports.updateMarca = async (req, res) => {

    const { id,nombre } = req.body
    const updated = await Marca.update(

        {
            nombre: nombre,
            
        },
        { where: { id: id } }
    );

    res.status(200).json(updated)

}


//Eliminar producto de Carrito
exports.deleteMarca = async (req, res) => {

    const id = req.params.id;

    const borrado = await Marca.destroy(
        {
            where: { id: id }
        }
    )

    res.status(200).json({ data: borrado })

}