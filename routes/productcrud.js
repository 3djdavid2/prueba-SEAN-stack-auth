
const { Router } = require('express');
const router = Router();
const multer = require('multer')

//models
const Pack = require('../models/packs')

//CONTROLLER
const productsCRUD = require('../controllers/productcrud.controller')


//MIDDLEWARE
const verifyToken = require('../middlewares/verifyToken')
const actualiza = require('../middlewares/product')

const { uploadPhoto } = require('../middlewares/photoProd')

//multer middleware

const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
        cb(null, '')
    }
})

const fileFilter = (req, file, cb) => {

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
const upload = multer({ storage, fileFilter });


// MIDDLEWARE PACK UPDATE**
const updatePack = async (req, res, next) => {
    // console.log("midd updatePack pack para actualizar: ", req.body.data)
    const allProd = []
    allProd.push(req.body.data)
    allProdparsed = JSON.parse(allProd)
    packActivo= allProdparsed.packActivo
    mismoProdparsed = allProdparsed.mismoProd

    console.log("update del pack estado: ", packActivo)
    

    mismoProdparsed.forEach(async (el) => {

     
        const {
            id,
            id_prod,           
            packName,
            cantDesde,
            precio
        } = el


        //
        const pack = await Pack.findByPk(id);
        if (pack === null) {
            console.log('Not found!');
            // crear nuevo
            const result = await Pack.create({
                id_prod,
                estado:+packActivo,
                packName,
                cantDesde,
                precio
            })

        } else {
            console.log(pack instanceof Pack); // true
            //update por id encontrado
            const result = await Pack.update(
                {
                    estado:packActivo,
                    cantDesde,
                    precio
                },
                { where: { id: id } }
            )

        }
        //  


    });



    next()
}


//example from sequelize.org David
// const jane = await User.create({ name: "Jane" });
// console.log(jane); // Don't do this
// console.log(jane.toJSON()); // This is good!
// console.log(JSON.stringify(jane, null, 4)); // This is also good!
//-


//ROUTER crud

router.get('/:value', productsCRUD.findByNameProduct)
router.post('/', [verifyToken, upload.single('productImage'), uploadPhoto], productsCRUD.createProduct);
router.put('/:codigo', [verifyToken, upload.single('productImage'), uploadPhoto, updatePack], productsCRUD.updateProdByCodigo)



//EXPORT MODULE
module.exports = router;