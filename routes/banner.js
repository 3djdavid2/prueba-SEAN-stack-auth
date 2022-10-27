const { Router } = require('express');
const router = Router();
const multer = require('multer')

//CONTROLLER
const banner = require('../controllers/banner.controller')


//const multer = require('multer')

//MIDDLEWARE
const verifyToken = require('../middlewares/verifyToken')
// const actualiza = require('../middlewares/product')
const { uploadPhoto, deletePhoto } = require('../middlewares/photoProd')

//multer middleware
const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
        cb(null, '')
    }
})
const fileFilter = (req, file, cb) => {   

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
const upload = multer({ storage, fileFilter });

//ROUTER

router.get('/', banner.getBanners)


router.get('/:name', verifyToken, banner.getBannerById)
router.post('/',  [verifyToken, upload.single('productImage'), uploadPhoto], banner.createBanner)
router.put('/:name',  [verifyToken, upload.single('productImage'), uploadPhoto], banner.updateBannerById)
router.delete('/:name', [verifyToken, deletePhoto], banner.deleteBannerById)



module.exports = router;