const mongoose=require('mongoose')

const mongo=mongoose.connect(process.env.MONGO_URL).then(()=>{
  console.log("server connected");
})

module.exports=mongo

