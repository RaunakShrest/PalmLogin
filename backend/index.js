const express= require("express")
const {chats}= require("./data/data")
const dotenv= require("dotenv")
const dbConnect = require('./connection/dbConnect')

const connectDb= require('./config/generateToken')
const app= express()
dotenv.config();
connectDb();
app.use(express.json())
const users= require("../backend/model/userRegistrationModel")
const userRoutes= require("./routes/userRoutes")
const { registerUser, authUser, getAllUsers,deleteUser, findByID } = require("./controllers/userControllers")

const { notFound, errorHandler } = require("./middleware/errorMiddleware")

dbConnect()

app.get('/',(req,res)=>{

    res.send("Running API Succesfully")
})
 //Json data from frontend lai accept garna
app.get("/api/chat",(req,res)=>{

res.send(chats)

})

app.use('/api/register',registerUser)
app.use('/api/login',authUser)
// app.use('/api/Id',userId)
app.use('/api/getAllUsers',getAllUsers)
app.use('/api/deleteUser',deleteUser)
// app.delete('/users/:id', deleteUser);

app.use('/api/user',userRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT= process.env.PORT || 5000
app.listen(5000, console.log(`Server started on PORT ${PORT}`))