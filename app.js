const express=require('express')
const app=express()
const port=3000
const bodyParser=require("body-parser")
const session=require("express-session")
const dotenv=require("dotenv")
dotenv.config()

require("dotenv").config
app.use(express.static('public'));


app.use(session({
    secret:process.env.MYPASS,
    saveUninitialized:true,
    resave:false,
    cookie:{
        maxAge:24*60*60*1000
    }

}))
const mongo=require('./config/config')




app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const adminroutes=require("./routes/adminroutes")
app.use("/admin",adminroutes)
const userroutes=require("./routes/userRoute")
app.use("/",userroutes)


app.set("view engine","ejs")
app.listen(port)