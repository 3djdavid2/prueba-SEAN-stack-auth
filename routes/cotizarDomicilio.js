const { Router } = require('express');
const router = Router();


//CONTROLLER
const cotizarDomicilio = require('../controllers/cotizarDomicilio.controller')

//MIddleware
const verifyToken = require('../middlewares/verifyToken')

//ROUTER

router.get('/', verifyToken, cotizarDomicilio.getCotizacion)



module.exports = router;