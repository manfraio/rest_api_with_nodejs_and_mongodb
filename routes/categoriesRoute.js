const router = require('express').Router()
const categoriesController = require('../controllers/categoriesController')

router.post('/', categoriesController.createCategory)
router.get('/', categoriesController.getAllCategories)
router.put('/:id', categoriesController.updateCategoryById)
router.delete('/:id', categoriesController.deleteCategoryById)

module.exports = router