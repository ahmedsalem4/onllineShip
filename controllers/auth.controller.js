
const  validationResult  = require("express-validator").validationResult;
const authModle = require("../models/auth.model")
exports.getsignup = (req, res, next) =>{
    
    res.render("signup",{
        validationerr:req.flash("validationErr") ,
        isUser:false ,
        pageTitle:"Signup",
        isAdmin: false
    });

}

exports.postSignup = (req, res, next) =>{
   
    if(validationResult(req).isEmpty()){
        const username= req.body.username;
        const email=req.body.email;
        const password =req.body.password;
         authModle.cearteNewUser(username,email,password
             ).then(
             ()=>{
                 res.redirect("/login")
             }
         ).catch(
             (err) =>{
                 res.redirect("/signup")
             }
         )
    }else{
        req.flash("validationErr",validationResult(req).array());
        res.redirect("/signup")
    }
   
    
}


exports.getlogin = (req, res, next) =>{
    res.render("login" , {
        authErr:req.flash("authErr")[0],
        validationLogin:req.flash("validationLogin"),
        isUser:false,
        pageTitle:"Login",
        isAdmin: false
    });
    
}

exports.postLogin = (req, res, next) =>{
  
    const email = req.body.email; 
    const password = req.body.password 
    if(validationResult(req).isEmpty()){
    authModle.login(email,password).then(
        (result)=>{
            req.session.userid = result.id,
            req.session.isAdmin = result.isAdmin,
            res.redirect("/");
        }
    ).catch(
        (err)=>{
            req.flash("authErr",err);
            res.redirect("/login")
        }
    )
    }else{
        req.flash("validationLogin",validationResult(req).array());
        res.redirect("/login")
    }

}



exports.logOut = (req, res , next ) =>{
    req.session.destroy( ()=>{
        res.redirect("/login");
    })
}