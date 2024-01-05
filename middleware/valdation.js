const msg=require("../controllers/mainContorller").msg
function wrong(req, res, next) {
    const regex = /^(?=.*[A-Za-z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const wrongs = regex.test(req.body.password)
    const emailwrong=regexEmail.test(req.body.email)
    if (wrongs && emailwrong) {
      next()
    }
    else {
      if(!emailwrong){
        msg.errs="email is not valid"
      }
      if(!wrongs){
        msg.errs= "At least 8 characters, including alphabets, digits, and the specified special characters."
      }
      res.redirect("/signup")
    }
  }
  

  module.exports=wrong

