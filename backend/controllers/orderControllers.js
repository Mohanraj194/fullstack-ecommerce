import asyncHandler from 'express-async-handler'
import Order from '../models/orderModels.js'

const addOrderItems = asyncHandler(async(req,res)=>{
   
    const { orderItems,shippingAddress,paymentMethod,taxPrice,shippingPrice,totalPrice,itemPrice } = req.body
  
    
        if(orderItems && orderItems.length===0)
        {
            res.status(400).json({
                message:'No Order Items'
            })
            return
        }
        else
        {
        const order =  new Order({
                user:req.user._id,
                orderItems,
                shippingAddress,
                paymentMethod,
                taxPrice,
                shippingPrice,
                totalPrice,
                itemsPrice:itemPrice
            })
            
            const createdOrder = await order.save()
            res.status(201).json(createdOrder)
        }
    
     
 })
 const getOrderById = asyncHandler(async(req,res)=>{
    
   const order = await Order.findById(req.params.id).populate('user','email name')
    
   if(order)
    {
        res.status(200).json(order)
    }
    else{
        res.status(400).json({
            message:'Order Id Is Not Founded'
        })
    }
     
 })

 const updateOrderToPay = asyncHandler(async(req,res)=>{
    
   const order = await Order.findById(req.params.id)
    
   if(order)
    {
        order.isPaid=true
        order.paidAt = Date.now()
        order.paymentResult = {
            id:req.body.id,
            status:req.body.status,
            update_time:req.body.update_time,
            email_address:req.body.payer.email_address
        }

        const updateOrder = await order.save()
        res.status(200).json(updateOrder)
    }
    else{
        res.status(400).json({
            message:'Order Id Is Not Founded'
        })
    }
     
 })

 const updateOrderToDeliver = asyncHandler(async(req,res)=>{
    
    const order = await Order.findById(req.params.id)
     
    if(order)
     {
         order.isDelivered=true
         order.deliveredAt = Date.now()
         const updateOrder = await order.save()
         res.status(200).json(updateOrder)
     }
     else{
         res.status(400).json({
             message:'Order Id Is Not Founded'
         })
     }
      
  })

 const getMyOrders = asyncHandler(async(req,res)=>{
    
    const order = await Order.find({user:req.user._id})
     
    res.status(200).json(order)
      
  })

  const getOrders = asyncHandler(async(req,res)=>{
    const order = await Order.find({}).populate('user','id name')
    if(order)
    {
        res.status(200).json(order)
    }
    else{
        res.status(400).json({
            message:'Orders Not Found'
        })
    }
  })
 export {addOrderItems,getOrderById,updateOrderToPay,updateOrderToDeliver,getMyOrders,getOrders}