import jwt from "jsonwebtoken";
import asyncHandler from 'express-async-handler'
import User from "../models/userModels.js";

const protect = asyncHandler(async(req,res,next)=>{

    let token
    //console.log(req.headers.authorization)
    if(req.headers.authorization && (req.headers.authorization.startsWith('Bearer')))
    {
    try {
            token = req.headers.authorization.split(' ')[1]
            const decode  = jwt.verify(token,process.env.SECRET_JWT_TOKEN)
            //console.log(decode)
            req.user = await User.findById(decode.id).select('-password')
            
            next()

        } catch (error) {

            res.status(401).json({
                message: 'Not Authorized Token Failed',
                error
            })
        }
    }

    if(!token)
    {
        res.status(401).json({
            message: 'Not Authorized No Token'
        })
    }
    

})

const admin = (req,res,next)=>{
    if(req.user && req.user.isAdmin)
    {
        next()
    }
    else{
        res.status(400).json({
            message:'Not Authorized As An Admin'
        })
    }
}

export {protect,admin}
