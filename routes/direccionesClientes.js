const { Router } = require('express');
const router = Router();


//CONTROLLER
const direccion = require('../controllers/direccion.controller')

//MIddleware
const verifyToken = require('../middlewares/verifyToken')

//ROUTER

router.get('/', verifyToken, direccion.getDirections)
router.put('/', verifyToken, direccion.updateDirection)
router.post('/', verifyToken, direccion.createDirection)
router.delete('/:id', verifyToken, direccion.deleteDirection)

module.exports = router;