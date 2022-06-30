const { Router } = require('express');
const router = Router();


//CONTROLLER
const transferencia = require('../controllers/transferencia.controller')

//MIddleware
const verifyToken = require('../middlewares/verifyToken')

//ROUTER

router.get('/', verifyToken, transferencia.getTransferencia)
router.put('/', verifyToken, transferencia.updateTransferencia)

module.exports = router;