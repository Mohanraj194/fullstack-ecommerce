import mongoose from 'mongoose'
import color from 'colors'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import users from './data/user.js'
import products from './data/products.js'
import User from './models/userModels.js'
import Product from './models/productModels.js'
import Order from './models/orderModels.js'

dotenv.config()
connectDB()

const importData = async()=>{

    try {
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()

        const userCreated = await User.insertMany(users)
        const adminUser = userCreated[0]._id

        const sampleProducts = products.map(pro=>{
            return{...pro,user:adminUser}
        })
        await Product.insertMany(sampleProducts)

        console.log('ImportData'.green.inverse)
        
    } catch (error) {
        console.log(`error in seeder.js ImportData ${error}`.red.inverse)
    }

}

const destroyData = async()=>{

    try {
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()
        console.log('destroyData'.red.inverse)
        
    } catch (error) {
        console.log(`error in seeder.js destroyData ${error}`.red.inverse)
    }

}

if(process.argv[2]==='-d')
{
    destroyData()
}
else{
    importData()
}