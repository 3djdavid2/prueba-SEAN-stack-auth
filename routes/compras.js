const { Router } = require('express');
const router = Router();

//CONTROLLER
const carrito = require('../controllers/compras.controller')

//MIddleware
const verifyToken = require('../middlewares/verifyToken')

//ROUTER

router.get('/', verifyToken, carrito.getCompra)
router.post('/', verifyToken, carrito.createCompra)

module.exports = router;