const { Router } = require('express');
const router = Router();

//CONTROLLER
const marcas = require('../controllers/marcas.controller')

//MIddleware
const verifyToken = require('../middlewares/verifyToken')

//ROUTER

router.get('/', verifyToken, marcas.getMarcas)
router.post('/', verifyToken, marcas.createMarca)
router.put('/:id', verifyToken, marcas.updateMarca)
router.delete('/:id', verifyToken, marcas.deleteMarca)


module.exports = router;