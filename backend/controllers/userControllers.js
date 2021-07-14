import asyncHandler from 'express-async-handler'
import User from '../models/userModels.js'
import generateToken from '../utils/generateToken.js';

const userAuth = asyncHandler(async(req,res)=>{
   
   const {email,password} = req.body

   const user = await User.findOne({email})
    
   if(user && (await user.matchPassword(password))){
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        token:generateToken(user._id)        
    })
    
   }
   else{
      res.status(401).json({
          message:'Invalid user or password'
      })
     /*  res.statusCode(401)
     throw new Error('Invalid user or password') */
   }
   
    
})


const getUserProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id)
   if(user)
   {
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin
    })
   }
   else{
       res.status(401).json({
           message:'User Not Found'
       })
   }


 })
 const updateUserProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id)
   if(user)
   {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if(req.body.password)
    {
        user.password = req.body.password
    }
    const updatedUser = await user.save()
    res.status(201).json({
        _id:updatedUser._id,
        name:updatedUser.name,
        email:updatedUser.email,
        isAdmin:updatedUser.isAdmin,
        token:generateToken(updatedUser._id)  
    })
   }
   else{
       res.status(401).json({
           message:'User Not Found'
       })
   }


 })

 const registerUser = asyncHandler(async(req,res)=>{
    const {name,email,password} = req.body

    const isExists = await User.findOne({email})
    if(isExists){
        res.status(401).json({
            message:'User is already Exists'
        })
    } 

    const user = await User.create({
        name,email,password
    })

    if(user)
    {
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        })
    }
    else{
        res.json(401).json({
            message:'User not Found'
        })
    }

 })

 const getUsers = asyncHandler(async(req,res)=>{
    const users = await User.find({})
    res.status(200).json(users)
 })

 const deleteuser = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id)
    if(user)
    {
        await user.remove()
        res.status(202).json({
            message:'User Deleted Successfully'
        })
    }
    else{
        res.status(404).json({
            message:'User Not Define'
        })
    }
 })

 const getUserById = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id).select('-password')
    if(user)
    {
        res.status(200).json(user)
    }
    else{
        res.status(404).json({
            message:'User Not Define'
        })
    }

 })

 const updateUserById = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id)
    
   if(user)
   {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if(req.body.isAdmin!== undefined && user.isAdmin != req.body.isAdmin)
    {
        user.isAdmin = req.body.isAdmin 
    }

    const updatedUser = await user.save()
    
    res.status(200).json({
        _id:updatedUser._id,
        name:updatedUser.name,
        email:updatedUser.email,
        isAdmin:updatedUser.isAdmin
    })
   }
   else{
       res.status(401).json({
           message:'User Not Found'
       })
   }
})


export {userAuth,getUserProfile,registerUser,updateUserProfile,getUsers,deleteuser,getUserById,updateUserById}