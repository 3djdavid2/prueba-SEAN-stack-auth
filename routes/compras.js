const { Router } = require('express');
const router = Router();

//CONTROLLER
const carrito = require('../controllers/compras.controller')

//MIddleware
const verifyToken = require('../middlewares/verifyToken')
const {findUserByEmail, guardarCompraTBK} = require('../middlewares/compras')

//ROUTER

router.get('/', verifyToken, carrito.getCompra)
router.post('/', [verifyToken, findUserByEmail, guardarCompraTBK], carrito.createCompra)

module.exports = router;