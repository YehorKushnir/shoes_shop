const ProductModel = require('../models/product-model')
const ApiError = require("../exceptions/api-error");

class ProductService {
    async getAll() {
        return ProductModel.find()
    }

    async getById(id) {
        const product = await ProductModel.findById(id)
        if(!product) {
            throw ApiError.BadRequest(`Product not found`)
        }

        return product
    }

    async create(data) {
        return ProductModel.create(data)
    }

    async update(id, data) {
        return ProductModel.findByIdAndUpdate(id, data, { new: true })
    }

    async remove(id) {
        return ProductModel.findByIdAndDelete(id)
    }

    async addReview(productId, review, user) {
        const product = await ProductModel.findById(productId)
        if(!product) {
            throw ApiError.BadRequest(`Product not found`)
        }

        product.reviews.push({...review, user: user.id, username: user.name})
        const totalRatings = product.reviews.reduce((sum, r) => sum + r.rating, 0)
        product.totalReviews = product.reviews.length
        product.averageRating = (totalRatings / product.totalReviews).toFixed(2)

        await product.save()
        return product
    }
}

module.exports = new ProductService()