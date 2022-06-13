const { Router } = require('express');
const router = Router();


//CONTROLLER
const perfil = require('../controllers/perfil.controller')

//MIddleware
const verifyToken = require('../middlewares/verifyToken')

//ROUTER

router.get('/', verifyToken, perfil.getMisDatos)
router.put('/', verifyToken, perfil.updateMisDatos)

module.exports = router;