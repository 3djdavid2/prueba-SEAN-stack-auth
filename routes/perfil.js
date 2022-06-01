const { Router } = require('express');
const router = Router();

//CONTROLLER
const perfil = require('../controllers/perfil.controller')

//ROUTER

router.get('/:email', perfil.getMisDatos)
router.put('/:email', perfil.updateMisDatos)

module.exports = router;