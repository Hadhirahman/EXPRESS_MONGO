const mongoose=require('mongoose')
const userschema=new mongoose.Schema({
    fullname:String,
    email:String,
    age:Number,
    hashedpass:String,
    userstatus:String
    })
    const usrermodel=new mongoose.model("userData",userschema)

    module.exports=usrermodel