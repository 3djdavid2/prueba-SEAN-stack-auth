const { Router } = require('express');
const router = Router();

const ctl = require('../controllers/excel.controller')
const verifyToken = require('../middlewares/verifyToken')
router.get('/', ctl.get)

module.exports = router;