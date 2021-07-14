import express from 'express'
import { createProduct, createProductreview, deleteProduct, getProductById, getProducts, topProduct, updateProduct } from '../controllers/productControllers.js'
import {protect,admin} from '../middleware/AuthMiddleware.js'
const router = express.Router()


router.route('/').get(getProducts).post(protect,admin,createProduct)
router.route('/:id/reviews').post(protect,createProductreview)
router.get('/top',topProduct)
router.route('/:id').get(getProductById).delete(protect,admin,deleteProduct).put(protect,admin,updateProduct)

export default router


/* import asyncHandler from 'express-async-handler'
import Product from '../models/productModels.js' */
/* 
router.get('/',asyncHandler(async(req,res)=>{
    const products = await Product.find({})
    res.json(products)
}))
router.get('/:id',asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id)
    if(product)
    {
        res.json(product)
    }
    else{
        res.status(404).json({message:'Product not Founded' })
    }
    
})) */