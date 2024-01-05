
const dbs=require("../models/userschema")
const bcrypt=require("bcrypt")
const productmodel=require("../models/productschema")




let err=""
let adobj={
    getAddlogin:(req,res)=>{
        if(req.session.tocken){
            res.redirect("/admin/admin")
        }
        else{
            res.render("admin/loginadmin",{adlogerr:err})
            err=""
        }
    },

    getadmin:(req,res)=>{
        if(req.session.tocken){
            res.render("admin/admin")
        }
        else{
            res.redirect("/login")
        }
    },


    postLoging:async(req,res)=>{   
        const{Email,password}=req.body
        const admins=await dbs.findOne({$and :[{userstatus:"admin"},{email:Email}]})
        if(admins){
            const passcheck=await bcrypt.compare(password,admins.hashedpass)
            if(passcheck){
                req.session.tocken=admins.email
                res.redirect("/admin/admin")
            }else{
                err="wrong password"
                res.redirect("/login")
            }
        }
        else{
            err="invalid admin"
            res.redirect("/login")
        }
             
    },


    getlogout:(req, res) => {
        req.session.destroy((error) => {
          if (error) {
            console.log("session desroy");
        }else{
              res.redirect("/admin");
              console.log("session destroyed");
            }
        });
    },
    
    Addproduct:(req,res)=>{
        if(req.session.tocken){
            res.render("admin/addProduct")
        }else{
            res.redirect("/login");
        }
      },


      postAddproduct: async(req,res)=>{
        let productName=req.body.productName
        let productDescription=req.body.productDescription
        let productPrice=req.body.productPrice
        let imagePath = req.file ? 'product-images/' + req.file.filename : '';
        const product={
            productName,
            productDescription,
            productPrice,
            imagePath
        }  

           const productdata=await productmodel.insertMany(product)
           res.redirect("/admin/addproduct")
        },

        getproductlist:async(req,res)=>{
            if(req.session.tocken){
                const product=await productmodel.find()
                res.render("admin/listproduct",{product})

            }else{
                res.redirect("/login")
            }
        },

        getproductdelete: async (req, res) => {
            const productId = req.params.productId;
              const product = await productmodel.findById(productId);
            console.log( product);
              if (product) {
               
                const product = await productmodel.findByIdAndDelete(productId);
                res.redirect('/admin/productlist');
              }
              
            
          },



          getproductedit: async (req, res) => {
            if(req.session.tocken){
                const productId = req.params.productId;
                  const product = await productmodel.findById(productId);
                  res.render('admin/editproduct', { product });
            }else{
                res.redirect("/login")
            }
            
          },


          postproductedit:async (req, res) => {
            const productId = req.params.productId;
            const { productName, productDescription, productPrice } = req.body;
              const product = await productmodel.findById(productId);
              if (product) {
                  product.productName = productName;
                  product.productDescription = productDescription;
                  product.productPrice = productPrice;
                  if(req.file){
                    product.imagePath=req.file ? 'product-images/' + req.file.filename : ''   
                }
                await product.save();
                console.log(product);
                res.redirect('/admin/productlist');
              }
          },


          getuserlist:async(req,res)=>{
            if(req.session.tocken){
                const users=await dbs.find()
                res.render("admin/adminuserlist",{users})
            }
            else{
                res.redirect("/login")
            }
          },

        getdeleteuser:async(req, res) => {
            const userId = req.params.userId;
            const user = await dbs.findById(userId);
            console.log(user);
            if(user){
                await dbs.findByIdAndDelete(user)
            }
            res.redirect("/admin/adminuserlist")
          }
          
   
}

module.exports={adobj}


