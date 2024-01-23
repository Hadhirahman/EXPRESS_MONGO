const express = require('express')
const router = express.Router()
const validation=require('../middleware/valdation')
// const Cart=require("../models/profileschema")

const {getsignup,getlogin,getadmin,getuser, getlogout, postsignup, postlogin,getprofile,getprofileupdate,postporifileupdate}=require('../controllers/mainContorller').obj



router.get("/signup",getsignup)
router.get("/login",getlogin)
router.get("/user",getuser)
router.get("/logout",getlogout)
router.post("/signup",validation,postsignup)
router.post("/login",postlogin)
router.get("/profile/:userId",getprofile)
router.get("/profileupdate/:userId",getprofileupdate)
router.post("/updateprofile",postporifileupdate)


module.exports=router