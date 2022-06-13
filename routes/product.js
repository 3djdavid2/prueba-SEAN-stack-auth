const { Router } = require('express');
const router = Router();

//CONTROLLER
const productsCtrl = require('../controllers/product.controller')

//MIDDLEWARE
const verifyToken = require('../middlewares/verifyToken')
const actualiza = require('../middlewares/product')
const uploadPhoto = require('../middlewares/photoProd')

//ROUTER
router.post('/', verifyToken, uploadPhoto, productsCtrl.createProduct)
router.get('/', productsCtrl.getProductsByPage)
router.get('/count', productsCtrl.getProductsCount)
router.get('/:productId', productsCtrl.getProductById)
router.put('/:productId', verifyToken, actualiza, productsCtrl.updateProductById)
router.delete('/:productId', verifyToken, productsCtrl.deleteproductById)

//EXPORT MODULE
module.exports = router;