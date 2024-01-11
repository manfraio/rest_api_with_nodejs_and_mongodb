const mongoose = require('mongoose')
const Category = require('../models/Category')
const Product = require('../models/Product')

exports.createCategory = async(request, response) => {
    try {
        if (!request.body.name) {
            return response.status(422).json({ error: 'Name field is required' })
        }

        if (await Category.findOne({ name: request.body.name })) {
            return response.status(409).json({ error: `The category ${request.body.name} already exists` })
        }

        const newCategory = await Category.create(request.body)

        return response.status(201).json(newCategory)
    } catch(error) {
        return response.status(500).json({ error: error.message })
    }
}

exports.getAllCategories = async (request, response) => {
    try {
        const categories = await Category.find().select('-__v')

        return response.status(200).json(categories)
    } catch(error) {
        return response.status(500).json({ error: error.message })
    }
}

exports.updateCategoryById = async (request, response) => {
    try {
        if (!mongoose.isValidObjectId(request.params.id)) {
            return response.status(422).json({ error: 'Parameter is not a valid id' })
        }

        if (!await Category.exists({ _id: request.params.id })) {
            return response.status(404).json({ error: 'Category not found' })
        }

        const categoryUpdated = await Category.findByIdAndUpdate(request.params.id, request.body, { new: true })

        return response.status(200).json(categoryUpdated)
    } catch(error) {
        return response.status(500).json({ error: error.message })
    }
}

exports.deleteCategoryById = async (request, response) => {
    try {
        if (!mongoose.isValidObjectId(request.params.id)) {
            return response.status(422).json({ error: 'Parameter is not a valid id' })
        }

        const category = await Category.findById(request.params.id)

        if (!category) {
            return response.status(404).json({ error: 'Category not found' })
        } else {
            const productsCount = await Product.countDocuments({ category: category._id })

            if (productsCount > 0) {
                return response.status(409).json({ error: `Category ${category.name} is being use in ${productsCount} product(s)` })
            }

            await category.deleteOne()
        }

        return response.status(204).send()
    } catch(error) {
        return response.status(500).json({ error: error.message })
    }
}