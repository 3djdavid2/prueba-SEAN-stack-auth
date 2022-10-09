//packs
const Pack = require('../models/packs')


//Obtener listado de packs por id ACTIVO O INACTIVO
exports.getPackByCodigo = async (req, res) => {


    const id = req.params.id;

    const pack = await Pack.findAndCountAll({

        where: {
            id_prod: id

        },
    });

    res.status(201).json(pack);
}


//Obtener todos los packs ACTIVOS O INACTIVOS asi los puedo activar desde admin.
exports.getPacks = async (req, res) => {

    var pack = await Pack.findAndCountAll({
        // where: { estado: packActivo }, //cambio para llevar todos los packs aunque esten desactivados en cero.
        where: {},
    });


    res.status(201).json(pack);

}


//Crear pack a la base de datos
exports.createPack = async (req, res) => {

    const { id_prod, packName, cantDesde, precio } = req.body

    const packSave = await Pack.create({
        id_prod, packName, cantDesde, precio
    })

    res.status(201).json({ messageTest: packSave })
}

//Update pack a la base de datos
exports.updatePackById = async (req, res) => {

    const { id, cantidad, total } = req.body

    const pack = await Pack.update(

        {
            cantidad: cantidad,
            total: total

        },
        { where: { id: id } }
    );

    res.status(200).json(pack)
}

//Eliminar
exports.deletePackById = async (req, res) => {

    id = req.params.id

    await Pack.destroy(
        { where: { id: id } }
    )

    res.status(201).json({ messageTest: "Pack eliminado" })
}
