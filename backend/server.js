import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'

// app config
const app = express()
const port = process.env.PORT || 4000

// DB & Cloudinary
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // ✅ REQUIRED
app.use(cors())

// api endpoints
app.use('/api/admin', adminRouter)
// http://localhost:4000/api/admin/add-doctor

app.get('/', (req, res) => {
  res.send('API WORKING')
})

app.listen(port, () => console.log(`Server Started on port ${port}`))
