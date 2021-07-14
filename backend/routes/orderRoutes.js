import express from 'express'
import { addOrderItems,getOrderById, updateOrderToPay,getMyOrders, getOrders, updateOrderToDeliver } from '../controllers/orderControllers.js'
import {admin, protect} from '../middleware/AuthMiddleware.js'
const router=express.Router()

router.route('/').post(protect,addOrderItems).get(protect,admin,getOrders)
router.route('/myorders').get(protect,getMyOrders)
router.route('/:id').get(protect,getOrderById)
router.route('/:id/pay').put(protect,updateOrderToPay)
router.route('/:id/deliver').put(protect,admin,updateOrderToDeliver)

export default router