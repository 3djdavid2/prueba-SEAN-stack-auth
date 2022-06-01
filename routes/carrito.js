const { Router } = require('express');
const router = Router();

//CONTROLLER
const carrito = require('../controllers/carrito.controller')

//ROUTER

router.post('/', carrito.createCarrito)
router.get('/', carrito.getCarritos)
router.get('/:order', carrito.getCarritoByOrder)
router.put('/:order', carrito.updateCarrito)
router.delete('/:order', carrito.deleteCarrito)

module.exports = router;