const { Router } = require('express');
const router = Router();


//CONTROLLER
const productCodigo = require('../controllers/productCodigo.controller')
//ROUTER


router.get('/:codigo', productCodigo.getProductByCodigo)


//EXPORT MODULE
module.exports = router;