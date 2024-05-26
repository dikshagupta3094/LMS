import express from 'express'
import cors from'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import userRoute from './routes/user.routes.js'
import errorMiddleware from './middleware/error.middleware.js'
const app = express()

app.use(express.json())

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    credentials:true
}))

app.use(cookieParser()) // cookie wagera parse ho sakhe
app.use(morgan('dev'))

app.use('/api/v1/userRoute',userRoute)

// app.all('*',(req,res)=>{
//     res.status(404).send("Oops!, Page not found")
// })
app.use(errorMiddleware)
export default app;