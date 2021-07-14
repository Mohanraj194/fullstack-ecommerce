import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connnectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import {notFounded,errorHandler} from './middleware/errorMiddleware.js'
dotenv.config()
connnectDB()

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 5000
app.listen(PORT,console.log(`server runs in ${process.env.NODE_ENV} port ${PORT}`.yellow.underline))





app.use('/products',productRoutes)
app.use('/user',userRoutes)
app.use('/orders',orderRoutes)
app.use('/upload',uploadRoutes)

app.get('/config/paypal',(req,res)=>res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))




if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
  } else {
    
    app.get('/',(req,res)=>{
        res.send("welcome node")
    })
  }

app.use(notFounded)

app.use(errorHandler)
