import asyncHandler from 'express-async-handler'
import Product from '../models/productModels.js'

const getProducts = asyncHandler(async (req, res) => {

    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1
    const keyword = req.query.keyword ? {
        name:{
            $regex:req.query.keyword,
            $options:'i'
        }
    } : {}
   
    const count = await Product.countDocuments({...keyword})
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page -1))
   
    res.status(200).json({products,page,pages:Math.ceil(count/pageSize)})
})

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    }
    else {
        res.status(404).json({ message: 'Product not Founded' })
    }
})

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        await product.remove()
        res.status(200).json({
            message: 'Product Removed Successfully'
        })
    }
    else {
        res.status(404).json({ message: 'Product not Founded' })
    }
})

const createProduct = asyncHandler(async (req, res) => {

    const product = new Product({
        user: req.user._id,
        name: "Same Name",
        image: "/images/sample.jpg",
        brand: "Sample Brand",
        category: "Sample Category",
        description: "Sample Product description",
        numReviews: 0,
        price: 0,
        rating: 0,
        countInStock: 0
    })

    const createProduct = await product.save()

    if (createProduct) {
        res.status(201).json(createProduct)
    }
    else {
        res.status(400).json({
            message: 'Product Not Created'
        })
    }


})

const updateProduct = asyncHandler(async (req, res) => {
    const { name, image, brand, category, description, price, countInStock } = req.body
    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = name || product.name
        product.image = image || product.image
        product.brand = brand || product.brand
        product.countInStock = countInStock || product.countInStock
        product.category = category || product.category
        product.description = description || product.description
        product.price = price || product.price

        const updateProduct = await product.save()
        res.status(200).json(updateProduct)
    }
    else {
        res.status(400).json({
            message: 'Product Not Defined'
        })
    }



})

const createProductreview = asyncHandler(async (req, res) => {

    const { rating, comment } = req.body
    //console.log(req.params.id)

    const product = await Product.findById(req.params.id)
    // console.log(product)

    if (product) {
        const alreadyReviewed = product.reviews.find(x => x.user.toString() === req.user._id.toString())
        if (alreadyReviewed) {
            res.status(400).json({
                message: 'Product Already Reviewd.'
            })
            throw new Error('Product Already Reviewd')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review)
        product.numReviews = product.reviews.length

        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

        await product.save()
        res.status(200).json({
            message: 'Review Added Successfully'
        })

    }
    else {
        res.status(400).json({
            message: 'Product Not Found'
        })
    }


})

const topProduct = asyncHandler(async (req, res) => {

    const product =  await Product.find({}).sort({rating:-1}).limit(3)
    res.status(200).json(product)
   
})

export { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductreview,topProduct }