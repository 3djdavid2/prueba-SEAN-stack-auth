
const Categoria = require('../models/categoria')

//Crear 

exports.createCategoria = async (req, res) => {
   
    const { nombre} = req.body

    created = await Categoria.create({
       nombre
    });

    res.status(201).json(created)
}



//Obtener todo

exports.getCategorias = async (req, res) => {

    const encontrado = await Categoria.findAndCountAll({
        where: {}
    });
    res.status(200).json(encontrado)

}



//Actualizar cantidad de un producto del carrito

exports.updateCategoria = async (req, res) => {

    const { id, nombre } = req.body
    const updated = await Categoria.update(

        {
            nombre: nombre,
            
        },
        { where: { id: id } }
    );

    res.status(200).json(updated)

}


//Eliminar producto de Carrito
exports.deleteCategoria = async (req, res) => {

    const id = req.params.id;

    const borrado = await Categoria.destroy(
        {
            where: { id: id }
        }
    )

    res.status(200).json({ data: borrado })

}