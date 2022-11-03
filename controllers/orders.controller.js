//packs
const Ordenes = require('../models/orden')
const EstadoPedido = require('../models/estadoPedido');
const Tiendas = require('../models/tiendas');

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


//
exports.getOrders = async (req, res) => { 

    email = req.body.email
    role = req.body.role

    //tiendaId
    const tienda = await Tiendas.findOne({
        raw:true,
        where: { email}
    })

   

    if (role == 'store') {

        var finded = await Ordenes.findAll({
            where: {tiendaId: tienda.id},
            include: {
                all: true
            }
        });

     

    } else {
        var finded = await Ordenes.findAll({
            where: {},
            include: {
                all: true
            }
        });
    }


    var listEstadosorden = await EstadoPedido.findAll({
        raw:true,
        where:{}
    })

  

    data = {orden: finded, estados: listEstadosorden}


    res.status(201).json(data);
}


exports.updateOrderById = async (req, res) => {


    const {

        tipoEntregaId,
        tiendaId,
        quienRetiraId,
        rutRetira,
        nombreRetira,
        DomicilioId,
        quienRecibeId,
        rutRecibe,
        nombreRecibe,
        tipoDocId,
        tipoDatosFAId,
        rutFA,
        razonFA,
        giroFA,
        telFA,
    } = req.body

    const updated = await Ordenes.update(

        {
            tipoEntregaId,
            tiendaId,
            quienRetiraId,
            rutRetira,
            nombreRetira,
            DomicilioId,
            quienRecibeId,
            rutRecibe,
            nombreRecibe,
            tipoDocId,
            tipoDatosFAId,
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