
const bycrypt=require('bcrypt')

const userdatas=require("../models/userschema")
const productschema=require("../models/productschema")
const profileschema=require("../models/profileschema")
const msg={errs:""}
const mongoose=require("mongoose")


let err=""
let obj={
  getsignup:(req, res) => {
    if(req.session.tocken){
      res.redirect('/user')
    }
    else{
      res.render("signup",msg)
      msg.errs=""
      err = ""
    }
  },


  getlogin:(req, res) => {
    if(req.session.tocken){
      res.redirect('/user')
    }
    else{
      res.render("login", { logerr: err })
      err = ""
    }
  },



getuser:async(req, res) => {
  if(req.session.tocken){
    const id=await userdatas.findOne({_id:req.session.tocken})
    const products=await productschema.find()
    res.render("user",{products,id}) 
  }
  else{
    res.redirect("/signup")
  }
},

getlogout:(req, res) => {
  req.session.destroy((error) => {
    if (!error) {
      res.redirect("/login");
    }
  });
},

postsignup:async(req, res) => {
  const { fullname, email,age, password, Repassword} = req.body;
 
  const existUser = await userdatas.findOne({ email: email });

  if (existUser) {
    msg.errs = "Username already exists. Choose another username.";
    res.redirect("/signup");
  } else {
    if (password === Repassword) {
      const hashedpass=await bycrypt.hash(password,10)
      let userstatus="user"
      const newUser = {
        fullname,
        email,
        age,
        hashedpass,
        userstatus
      };
      const userdata = await userdatas.insertMany(newUser);
      const useridfind=await userdatas.findOne({email:email})
      const userId=await useridfind._id
      
      req.session.tocken=userId
      res.redirect("/user");
    } else {
      msg.errs = "Confirm password does not match";
      res.redirect("/signup");
    }
  }
},

postlogin:async (req, res) => {
  const { email, password, Repassword } = req.body;

  try {
    const existedUser = await userdatas.findOne({ email, userstatus: "user" });
    const existedUserAdmin = await userdatas.findOne({ email, userstatus: "admin" });

    if (existedUser) {
      const passMatched = await bycrypt.compare(password, existedUser.hashedpass);

      if (passMatched) {
        if (password === Repassword) {
          req.session.tocken = existedUser._id
          res.redirect("/user");
        } else {
          throw new Error("Password and confirm password do not match");
        }
      } else {
        throw new Error("Invalid password");
      }
    } else if (existedUserAdmin) {
      const passCheck = await bycrypt.compare(password, existedUserAdmin.hashedpass);
      

      if (passCheck) {
        if(password==Repassword){
          req.session.tocken = existedUserAdmin._id

          res.redirect("/admin/admin");
        }
        else {
          throw new Error("Password and confirm password do not match");
        }
      } else {
        throw new Error("Invalid password");
      }
    } else {
      throw new Error("Invalid username or password");
    }
  } catch (error) {
    console.error(error.message);
    err = error.message;
    res.redirect('/login');
  }
},




getprofile: async (req, res) => {
  try {
    if(req.session.tocken){

      const userId = req.session.tocken; 
      const userWithProfile = await userdatas.aggregate([
        { $match: { _id:new mongoose.Types.ObjectId(userId) } },
        {
          $lookup: {
            from: 'userprofiles', // Collection name for user profiles
            localField: '_id',
            foreignField: 'userId',
            as: 'profileDetails',
          },
        },
      ]);
  
      const profile = userWithProfile[0];
      res.render('user/profile', { profile });
    }
    else{
      res.redirect('/logout')
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

,



getprofileupdate:async (req, res) => {

  try {
    if(req.session.tocken){

      const userId = req.session.tocken; 
      const userWithProfile = await userdatas.aggregate([
        { $match: { _id:new mongoose.Types.ObjectId(userId) } },
        {
          $lookup: {
            from: 'userprofiles', // Collection name for user profiles
            localField: '_id',
            foreignField: 'userId',
            as: 'profileDetails',
          },
        },

        {
          $project: {
            _id: 0, // Exclude the "_id" field
            fullname: 1, // Include other fields as needed
            age: 1,
            profileDetails: 1, // Include the "profileDetails" field
          },
        },
      ]);
      const profile = userWithProfile[0];
      console.log(profile);
      res.render('user/updateProfil',{profile});
    }else{
      res.redirect('/logout')
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
},

postporifileupdate:async (req, res) => {
  try {
    if(req.session.tocken){

      const userId = req.params.userId;
      const { phoneNumber, gender, dob } = req.body;
     const  userProfile = await profileschema.findOneAndUpdate(
        { userId:new mongoose.Types.ObjectId(userId) },
        { phoneNumber, gender, dob },
        { new: true, upsert: true }
      );
      res.redirect(`/profile/${userId}`);
    }else{
      res.redirect('/logout')
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
},








}



module.exports={obj,msg}
