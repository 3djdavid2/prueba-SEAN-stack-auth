const { Router } = require('express');
const router = Router();


//CONTROLLER
const ordersCtrl = require('../controllers/orders.controller')


//ROUTER


router.get('/', ordersCtrl.getOrders)
router.get('/busca/:id', ordersCtrl.getOrderById)
// router.post('/', ordersCtrl.createOrder) //SE CREAN EN COMPRAS.CONTROLLER//
router.put('/:id', ordersCtrl.updateOrderById)
router.delete('/:id', ordersCtrl.deleteOrderById)


//EXPORT MODULE
module.exports = router;