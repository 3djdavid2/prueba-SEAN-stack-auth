const { Router } = require('express');
const router = Router();

//CONTROLLER
const carrito = require('../controllers/carrito.controller')

//MIddleware
const verifyToken = require('../middlewares/verifyToken')

//ROUTER

router.post('/', verifyToken, carrito.createCarrito)
router.get('/', verifyToken, carrito.getCarritos)
router.get('/admin', verifyToken, carrito.getAllCarritos)
router.get('/:id', verifyToken, carrito.getCarritoByOrder)
router.put('/', verifyToken, carrito.updateCarrito)
router.delete('/:id', verifyToken, carrito.deleteCarrito)



module.exports = router;