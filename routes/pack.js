const { Router } = require('express');
const router = Router();


//CONTROLLER
const pack = require('../controllers/pack.controller')

//MIDDLEWARE
const verifyToken = require('../middlewares/verifyToken')


//ROUTER


router.get('/', pack.getPacks)
router.get('/:id',  pack.getPackByCodigo)

router.post('/', verifyToken, pack.createPack)
router.put('/:id', verifyToken, pack.updatePackById)
router.delete('/:id', verifyToken, pack.deletePackById)



//EXPORT MODULE
module.exports = router;