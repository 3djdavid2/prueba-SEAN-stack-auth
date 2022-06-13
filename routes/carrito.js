const { Router } = require('express');
const router = Router();

//CONTROLLER
const carrito = require('../controllers/carrito.controller')

//MIddleware
const verifyToken = require('../middlewares/verifyToken')

//ROUTER

router.post('/', verifyToken, carrito.createCarrito)
router.get('/', verifyToken, carrito.getCarritos)
router.get('/:order', verifyToken, carrito.getCarritoByOrder)
router.put('/:order', verifyToken, carrito.updateCarrito)
router.delete('/:order', verifyToken, carrito.deleteCarrito)

module.exports = router;