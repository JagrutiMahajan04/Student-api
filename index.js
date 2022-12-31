import mongoose from "mongoose";
import express from "express"
import Student from "./models/Student.js"
import dotenv from "dotenv"
dotenv.config()


const app = express();
app.use (express.json())

mongoose.connect(process.env.MONGODB_URL,()=>{
    console.log('Connected to mongodb')
})


app.get("/health", (req,res)=>{
    res.json({
        status:'OK',
        message: 'ALL Good'
    })
})

app.post('/create-student',async(req,res)=>{
     const {roll, fullName, mobile} = req.body

     const newStudent = new Student({
        roll: roll,
        fullName: fullName,
        mobile:mobile
     })

     const savedStudent = await newStudent.save()

       res.json({
        success:true,
        data:savedStudent
       })
})


app.listen(5000, ()=>{
    console.log('Server started running on PORT 5000')
})