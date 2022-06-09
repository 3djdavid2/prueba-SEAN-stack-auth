const { Router } = require('express');
const router = Router();

//MIDDLEWARE
const verifyTokenIAT= require('../middlewares/verifyTokenIAT')

//CONTROLLER
const perfil = require('../controllers/perfil.controller')

//ROUTER

router.get('/:email', verifyTokenIAT,perfil.getMisDatos)
router.put('/:email', perfil.updateMisDatos)

module.exports = router;