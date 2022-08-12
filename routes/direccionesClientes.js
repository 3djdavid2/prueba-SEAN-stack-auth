const { Router } = require('express');
const router = Router();


//CONTROLLER
const direccion = require('../controllers/direccion.controller')

//MIddleware
const verifyToken = require('../middlewares/verifyToken')

//ROUTER

router.get('/', verifyToken, direccion.getMisDatos)
router.put('/', verifyToken, direccion.updateMisDatos)

module.exports = router;