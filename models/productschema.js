const mongoose=require('mongoose')
const productschema=new mongoose.Schema({
    productName:String,
    productDescription:String,
    productPrice:Number,
    imagePath: String
    
    })
    const productmodel= mongoose.model("productdata",productschema)

    module.exports=productmodel