//packs
const Ordenes = require('../models/orden')


//Obtener listado de packs por id ACTIVO O INACTIVO
exports.getOrderById = async (req, res) => {


    const id = req.params.id;

    const finded = await Ordenes.findAll({
        raw: true,
        where: {
            orden: id
        },
    });

    res.status(201).json(finded);
}


//Obtener todos los packs ACTIVOS O INACTIVOS asi los puedo activar desde admin.
exports.getOrders = async (req, res) => {

    var finded = await Ordenes.findAll({
        raw: true, // where: { estado: packActivo }, //cambio para llevar todos los packs aunque esten desactivados en cero.
        where: {},
    });


    res.status(201).json(finded);

}



exports.updateOrderById = async (req, res) => {

    const {

        tipoEntrega,
        tienda,
        quienRetira,
        rutRetira,
        nombreRetira,
        DomicilioId,
        quienRecibe,
        rutRecibe,
        nombreRecibe,
        tipoDoc,
        tipoDatosFA,
        rutFA,
        razonFA,
        giroFA,
        telFA,
    } = req.body

    const updated = await Ordenes.update(

        {
            tipoEntrega,
            tienda,
            quienRetira,
            rutRetira,
            nombreRetira,
            DomicilioId,
            quienRecibe,
            rutRecibe,
            nombreRecibe,
            tipoDoc,
            tipoDatosFA,
            rutFA,
            razonFA,
            giroFA,
            telFA,

        },
        { where: { id } }
    );

    res.status(200).json(updated)
}

//Eliminar
exports.deleteOrderById = async (req, res) => {

    id = req.params.id

    const destroyed = await Ordenes.destroy(
        { where: { id } }
    )

    console.log("destroy: ", destroyed)

    res.status(201).json({ messageTest: "eliminado" })
}