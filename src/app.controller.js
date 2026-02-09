import dotenv from'dotenv';
dotenv.config({path:'./src/config/dev.env'})
import { postRouter,userRouter,commentsRouter } from './Modules/index.js';
import connectDB from './DB/connection.js';
import './DB/Models/index.js'







const bootstrap= async(app,express)=>{
  app.use(express.json())
   await connectDB()
app.use('/posts',postRouter)
app.use('/User',userRouter)
app.use('/comments',commentsRouter)




app.all('/dummy',(req,res,next) =>{

    res.status(404).json({message:'Not found handler'})
})

}

export default bootstrap;