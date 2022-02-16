const { Router } = require('express');
const router = Router();

//CONTROLLER
const productsCtrl = require('../controllers/product.controller')

//MIDDLEWARE
const actualiza = require('../middlewares/product')
const uploadPhoto = require('../middlewares/photoProd')

//ROUTER
router.post('/', uploadPhoto, productsCtrl.createProduct)

router.get('/', productsCtrl.getProductsByPage)

router.get('/count', productsCtrl.getProductsCount)

router.get('/:productId', productsCtrl.getProductById)

router.put('/:productId', [actualiza], productsCtrl.updateProductById)

router.delete('/:productId', productsCtrl.deleteproductById)


//EXPORT MODULE
module.exports = router;