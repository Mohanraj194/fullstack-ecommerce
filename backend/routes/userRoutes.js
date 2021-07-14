import express from 'express'
import { userAuth,getUserProfile, registerUser,updateUserProfile,getUsers,deleteuser, getUserById, updateUserById } from '../controllers/userControllers.js'
import {protect,admin} from '../middleware/AuthMiddleware.js'
const router=express.Router()

router.route('/').post(registerUser).get(protect,admin,getUsers)
router.post('/login',userAuth)
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)
router.route('/:id').delete(protect,admin,deleteuser).get(protect,admin,getUserById).put(protect,admin,updateUserById)

export default router