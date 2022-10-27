const { Router } = require('express');
const router = Router();


//CONTROLLER
const productsCtrl = require('../controllers/product.controller')


//ROUTER


router.get('/category/:id', productsCtrl.getByCategory)
//
router.get('/', productsCtrl.getProductsByPage)
router.get('/busca/:value', productsCtrl.findByNameProduct)
router.get('/count', productsCtrl.getProductsCount)
router.get('/:productId', productsCtrl.getProductById)



//EXPORT MODULE
module.exports = router;