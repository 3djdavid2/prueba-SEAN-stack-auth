
const Banner = require('../models/banner')

//Crear
exports.createBanner = async (req, res) => {

    //aqui llega en req el productId y la cantidad a comprar
    const name = req.file.originalname
    const imgURL = req.body.Location

    data = JSON.parse(req.body.data)

    const {
        state
    } = data

    created = await Banner.create(
        {
            name,
            imgURL,
            state
        }
    );

    res.status(201).json(created)
}

exports.getBanners = async (req, res) => {
    const all = await Banner.findAll({
        raw: true,
        where: {}
    });
    res.status(200).json(all)
};
//Obtener 1 solo 
exports.getBannerById = async (req, res) => {
    console.log("getBannerById.", req.body.role, req.params.name,)
    const name = req.params.name;

    const findedById = await Banner.findAll({
        raw: true,
        where: {
            name
        }
    });
    res.status(200).json(findedById)
}



//Actualizar el estado del banner solamente

exports.updateBannerById = async (req, res) => {


    console.log("updateBannerById:", req.body, req.params)


    const checked = req.body.checked

    const name = req.params.name

    const updated = await Banner.update(

        {
            state:checked

        },
        { where: { name :name} }
    );

    res.status(200).json(updated)

}


//Eliminar producto de Carrito
exports.deleteBannerById = async (req, res) => {

    console.log("deletBannerbyid.", req.body, req.params,)

    const name = req.params.name;

    const destroyed = await Banner.destroy(
        {
            where: { name }
        }
    )

    res.status(200).json({ deleted: destroyed })

}