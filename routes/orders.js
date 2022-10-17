const { Router } = require('express');
const router = Router();


//CONTROLLER
const ordersCtrl = require('../controllers/orders.controller')
//MIddleware
const verifyToken = require('../middlewares/verifyToken')

//ROUTER


router.get('/', verifyToken, ordersCtrl.getOrders)
router.get('/busca/:id',verifyToken, ordersCtrl.getOrderById)
// router.post('/', verifyToken,ordersCtrl.createOrder) //SE CREAN EN COMPRAS.CONTROLLER//
router.put('/:id', verifyToken, ordersCtrl.updateOrderById)
router.delete('/:id', verifyToken,ordersCtrl.deleteOrderById)


//EXPORT MODULE
module.exports = router;