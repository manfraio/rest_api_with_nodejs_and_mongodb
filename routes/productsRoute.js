const router = require('express').Router()
const productsController = require('../controllers/productsController')

router.post('/', productsController.createProduct)
router.get('/', productsController.getAllProducts)
router.get('/:id', productsController.getProductById)
router.get('/category/:categoryId', productsController.getProductsByCategory)
router.put('/:id', productsController.updateProductById)
router.delete('/:id', productsController.deleteProductById)

module.exports = router