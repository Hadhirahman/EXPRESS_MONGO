const express=require("express")
const router = express.Router()
const multer=require("multer")
const storage=require("../middleware/multer")
const upload = multer({ storage: storage });
// const path = require('path');
const productschema=require("../models/productschema")

const {getAddlogin,getadmin,postLoging, getlogout, Addproduct, postAddproduct, getproductlist,getproductdelete,getproductedit,postproductedit,getuserlist,getdeleteuser}=require('../controllers/adminControl').adobj

router.get('/',getAddlogin)
router.get("/admin",getadmin)
router.post("/",postLoging)
router.get("/logout",getlogout)
router.get("/addproduct",Addproduct)
router.post("/addproduct",upload.single('productImage'),postAddproduct)
router.get("/productlist",getproductlist)
router.get('/deleteproduct/:productId',getproductdelete);
router.get('/editproduct/:productId',getproductedit);
router.post('/editproduct/:productId',upload.single('productImage'),postproductedit);
router.get("/adminuserlist",getuserlist)
router.get("/deleteuser/:userId",getdeleteuser)


  


module.exports=router
